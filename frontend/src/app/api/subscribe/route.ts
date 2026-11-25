// app/api/subscribe/route.ts
//
// Server-side endpoint that adds a website signup to Mailchimp.
// - The Mailchimp API key never reaches the browser.
// - New contacts are created as "pending", which makes Mailchimp send its
//   double opt-in confirmation email. They only become "subscribed" after
//   they click the link in that email (CASL express consent, confirmed).

import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { ROLE_VALUES } from "@/lib/newsletter-copy";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const API_KEY = process.env.MAILCHIMP_API_KEY ?? "";
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID ?? "";
const TAGS = (process.env.MAILCHIMP_TAGS ?? "Open Insights newsletter,Source: EPM website")
  .split(",")
  .map((t) => t.trim())
  .filter(Boolean);
// Bump this whenever the consent wording on the form changes, so each
// contact's record shows which wording they agreed to.
const CONSENT_VERSION = process.env.NEWSLETTER_CONSENT_VERSION ?? "oi-consent-v1";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Basic per-IP rate limit (per server instance). Good enough to slow bots;
// put a WAF or captcha in front if spam becomes a problem.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function clean(value: unknown, max = 100): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function mailchimp(path: string, init: RequestInit) {
  const dc = API_KEY.split("-").pop(); // e.g. "us21"
  return fetch(`https://${dc}.api.mailchimp.com/3.0${path}`, {
    ...init,
    headers: {
      Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
}

// Mailchimp rejects ISO 8601 here ("2026-11-25T04:10:36.416Z" → "This value
// is not a valid datetime"). It wants "YYYY-MM-DD HH:MM:SS", in UTC.
function mailchimpTimestamp(d: Date): string {
  return d.toISOString().slice(0, 19).replace("T", " ");
}

function fail(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(req: Request) {
  if (!API_KEY || !AUDIENCE_ID || !API_KEY.includes("-")) {
    console.error("[subscribe] Missing MAILCHIMP_API_KEY or MAILCHIMP_AUDIENCE_ID");
    return fail("server_config", 500);
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return fail("bad_request");
  }

  // Honeypot: real people never fill this hidden field.
  if (clean(body.website)) return NextResponse.json({ ok: true, status: "pending" });

  const email = clean(body.email, 254).toLowerCase();
  if (!EMAIL_RE.test(email)) return fail("invalid_email");

  // CASL: consent must be an active, unticked-by-default choice.
  if (body.consent !== true) return fail("consent_required");

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim();
  if (rateLimited(ip || "unknown")) return fail("rate_limited", 429);

  const language = body.language === "fr" ? "fr" : "en";
  const role = clean(body.role);

  // Only send fields that have values, so a returning visitor who skips a
  // field doesn't blank out what Mailchimp already has.
  const merge_fields: Record<string, string> = { CONSENT: CONSENT_VERSION };
  const firstName = clean(body.firstName, 50);
  const lastName = clean(body.lastName, 50);
  const organization = clean(body.organization, 100);
  if (firstName) merge_fields.FNAME = firstName;
  if (lastName) merge_fields.LNAME = lastName;
  if (organization) merge_fields.ORG = organization;
  if (role && ROLE_VALUES.includes(role)) merge_fields.ROLE = role;

  const hash = crypto.createHash("md5").update(email).digest("hex");
  const memberPath = `/lists/${AUDIENCE_ID}/members/${hash}`;

  try {
    // PUT = create or update. status_if_new only applies to brand-new contacts,
    // so existing subscribers are never re-sent a confirmation email.
    const res = await mailchimp(memberPath, {
      method: "PUT",
      body: JSON.stringify({
        email_address: email,
        status_if_new: "pending",
        language: language === "fr" ? "fr_CA" : "en",
        merge_fields,
        ...(ip ? { ip_signup: ip } : {}),
        timestamp_signup: mailchimpTimestamp(new Date()),
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      const title: string = data?.title ?? "";
      // Mailchimp lists the offending field(s) here. "Invalid Resource" covers
      // both a bad address AND a merge field this audience doesn't have, so
      // check which before blaming the visitor's email: telling someone their
      // valid address is invalid sends them hunting in the wrong place.
      const fieldErrors: Array<{ field?: string; message?: string }> = Array.isArray(data?.errors)
        ? data.errors
        : [];
      const aboutEmail =
        fieldErrors.length === 0 || fieldErrors.some((e) => e.field === "email_address");

      if (title === "Member In Compliance State") return fail("invalid_email");
      if (title === "Forgotten Email Not Subscribed") return fail("forgotten_email");
      if (title === "Invalid Resource" && aboutEmail) return fail("invalid_email");

      console.error(
        "[subscribe] Mailchimp rejected the request",
        res.status,
        title,
        data?.detail,
        fieldErrors.map((e) => `${e.field}: ${e.message}`).join("; ") ||
          "(no field detail)",
        "\n  If a merge field is named above, it is missing from the audience or " +
          "its merge tag differs. Audience → Settings → Audience fields and *|MERGE|* tags.",
      );
      return fail("mailchimp_error", 502);
    }

    let status: string = data.status;

    // Someone who unsubscribed earlier and has now actively opted in again:
    // send them a fresh double opt-in email rather than resubscribing silently.
    if (status === "unsubscribed") {
      const again = await mailchimp(memberPath, {
        method: "PATCH",
        body: JSON.stringify({ status: "pending" }),
      });
      if (again.ok) status = "pending";
    }

    // Tags can't be set on PUT, so add them in a second call.
    if (TAGS.length) {
      const tagRes = await mailchimp(`${memberPath}/tags`, {
        method: "POST",
        body: JSON.stringify({ tags: TAGS.map((name) => ({ name, status: "active" })) }),
      });
      if (!tagRes.ok) console.error("[subscribe] Could not tag contact", tagRes.status);
    }

    return NextResponse.json({ ok: true, status });
  } catch (err) {
    console.error("[subscribe] Request failed", err);
    return fail("mailchimp_error", 502);
  }
}

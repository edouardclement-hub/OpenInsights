// api/subscribe.js
//
// Vercel serverless function behind www.openinsights.ca/api/subscribe.
// Adds a website signup to Mailchimp:
// - The Mailchimp API key never reaches the browser.
// - New contacts are created as "pending", which makes Mailchimp send its
//   double opt-in confirmation email. They only become "subscribed" after
//   they click the link in that email (CASL express consent, confirmed).
//
// This mirrors frontend/src/app/api/subscribe/route.ts, which does the same
// job for epm.openinsights.ca. The two sites are separate Vercel projects
// with no shared build, so the logic is duplicated on purpose — change one
// and check the other.
//
// Needs MAILCHIMP_API_KEY and MAILCHIMP_AUDIENCE_ID in this project's
// Vercel environment variables. Without them the route answers
// server_config and the form shows the generic error.

const crypto = require("node:crypto");

// Must match the choices in the "Role" dropdown field in Mailchimp exactly.
const ROLE_VALUES = [
  "Researcher / academic",
  "Government / policymaker",
  "Industry / utility",
  "Non-profit / advocacy",
  "Media",
  "Student",
  "Other",
];

const API_KEY = process.env.MAILCHIMP_API_KEY || "";
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID || "";
const TAGS = (process.env.MAILCHIMP_TAGS || "Open Insights newsletter,Source: Open Insights website")
  .split(",")
  .map((t) => t.trim())
  .filter(Boolean);
// Bump this whenever the consent wording on the form changes, so each
// contact's record shows which wording they agreed to.
const CONSENT_VERSION = process.env.NEWSLETTER_CONSENT_VERSION || "oi-consent-v1";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Basic per-IP rate limit (per server instance). Good enough to slow bots;
// put a WAF or captcha in front if spam becomes a problem.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function clean(value, max = 100) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function mailchimp(path, init) {
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

// Mailchimp rejects ISO 8601 here. It wants "YYYY-MM-DD HH:MM:SS", in UTC.
function mailchimpTimestamp(d) {
  return d.toISOString().slice(0, 19).replace("T", " ");
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  const fail = (error, status = 400) => res.status(status).json({ ok: false, error });

  if (!API_KEY || !AUDIENCE_ID || !API_KEY.includes("-")) {
    console.error("[subscribe] Missing MAILCHIMP_API_KEY or MAILCHIMP_AUDIENCE_ID");
    return fail("server_config", 500);
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return fail("bad_request");
    }
  }
  if (!body || typeof body !== "object") return fail("bad_request");

  // Honeypot: real people never fill this hidden field.
  if (clean(body.website)) return res.status(200).json({ ok: true, status: "pending" });

  const email = clean(body.email, 254).toLowerCase();
  if (!EMAIL_RE.test(email)) return fail("invalid_email");

  // CASL: consent must be an active, unticked-by-default choice.
  if (body.consent !== true) return fail("consent_required");

  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  if (rateLimited(ip || "unknown")) return fail("rate_limited", 429);

  const language = body.language === "fr" ? "fr" : "en";
  const role = clean(body.role);

  // Only send fields that have values, so a returning visitor who skips a
  // field doesn't blank out what Mailchimp already has.
  const merge_fields = { CONSENT: CONSENT_VERSION };
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
    const put = await mailchimp(memberPath, {
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
    const data = await put.json();

    if (!put.ok) {
      const title = data?.title || "";
      // "Invalid Resource" covers both a bad address AND a merge field this
      // audience doesn't have, so check which before blaming the visitor's
      // email: telling someone their valid address is invalid sends them
      // hunting in the wrong place.
      const fieldErrors = Array.isArray(data?.errors) ? data.errors : [];
      const aboutEmail =
        fieldErrors.length === 0 || fieldErrors.some((e) => e.field === "email_address");

      if (title === "Member In Compliance State") return fail("invalid_email");
      if (title === "Forgotten Email Not Subscribed") return fail("forgotten_email");
      if (title === "Invalid Resource" && aboutEmail) return fail("invalid_email");

      console.error(
        "[subscribe] Mailchimp rejected the request",
        put.status,
        title,
        data?.detail,
        fieldErrors.map((e) => `${e.field}: ${e.message}`).join("; ") || "(no field detail)",
        "\n  If a merge field is named above, it is missing from the audience or " +
          "its merge tag differs. Audience → Settings → Audience fields and *|MERGE|* tags.",
      );
      return fail("mailchimp_error", 502);
    }

    let status = data.status;

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

    return res.status(200).json({ ok: true, status });
  } catch (err) {
    console.error("[subscribe] Request failed", err);
    return fail("mailchimp_error", 502);
  }
};

import { NextRequest, NextResponse } from "next/server";

/**
 * Scoped password gate.
 *
 * The site-wide gate is gone: every page is public except the assessments
 * index and the assessment detail pages, and even those open on their own at
 * the embargo lift below.
 *
 * GATE_LIFT_AT is an absolute instant, not a local wall-clock time. Middleware
 * runs on Vercel edge nodes in UTC while the embargo is quoted in Eastern, so
 * the offset is written into the string rather than inferred from the runtime:
 *
 *   2026-11-25T09:00:00-05:00  (Wed Nov 25, 2026, 9:00 AM EST)
 *   === 2026-11-25T14:00:00Z
 *
 * Once that instant passes the gate is a no-op for everyone, wherever they are.
 */
const GATE_LIFT_AT = Date.parse("2026-11-25T09:00:00-05:00");

// The only gated paths: the assessments index and every assessment detail page.
const GATED_PREFIXES = ["/assessments"];

// Static assets under /assessments/ (slide PNGs etc) — same-origin, no sensitive info.
const STATIC_ASSET_EXT = /\.(png|jpe?g|webp|svg|gif|ico|css|js|map|woff2?)$/i;

const COOKIE_NAME = "epm-auth";

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Scheduled unlock. After this instant nothing on the site is gated.
  if (Date.now() >= GATE_LIFT_AT) return NextResponse.next();

  // If no password is configured, leave the gate fully open (dev / not-yet-protected).
  const sitePassword = process.env.SITE_PASSWORD;
  if (!sitePassword) return NextResponse.next();

  // Anything outside the gated prefixes is public.
  const isGated = GATED_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
  if (!isGated) return NextResponse.next();

  // Static assets passthrough
  if (STATIC_ASSET_EXT.test(pathname)) {
    return NextResponse.next();
  }

  // Already unlocked in this browser — the /api/login cookie is the session, and
  // it is scoped to the whole site so one prompt covers index and detail pages.
  const expected = await sha256Hex(sitePassword);
  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  if (cookie === expected) return NextResponse.next();

  // Not authed → redirect to /login with the original path as ?from=
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("from", pathname + req.nextUrl.search);
  return NextResponse.redirect(url);
}

export const config = {
  // Only the assessments routes reach this middleware at all; every other page
  // is served without a gate check.
  matcher: ["/assessments", "/assessments/:path*"],
};

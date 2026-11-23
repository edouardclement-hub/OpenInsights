import { NextRequest, NextResponse } from "next/server";
import { isEmbargoed } from "@/lib/embargo";

/**
 * Scoped password gate.
 *
 * The site-wide gate is gone: every page is public except the assessments
 * index and the assessment detail pages, and even those open on their own when
 * the embargo lifts. The lift instant lives in @/lib/embargo, shared with the
 * homepage and the sitemap so that all three hide the same thing at the same
 * moment.
 */

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

  // Scheduled unlock. Once the embargo lifts nothing on the site is gated.
  if (!isEmbargoed()) return NextResponse.next();

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

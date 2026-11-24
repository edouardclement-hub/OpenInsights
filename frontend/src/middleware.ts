import { NextRequest, NextResponse } from "next/server";
import { isEmbargoed } from "@/lib/embargo";

/**
 * Site-wide password gate.
 *
 * Every page is behind SITE_PASSWORD while the embargo holds; only the login
 * flow and the SEO essentials below are reachable without it. The gate still
 * lifts on its own when the embargo does — see @/lib/embargo, which the
 * homepage and the sitemap share — so the whole site opens at that instant
 * without anyone having to deploy.
 */

// Paths that bypass the password gate (login flow + SEO essentials).
const PUBLIC_PATHS = [
  "/login",
  "/api/login",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
];

// Static assets (PNG/JPG/etc) — same-origin, no sensitive info.
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

  // Public paths
  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  // Static assets passthrough
  if (STATIC_ASSET_EXT.test(pathname)) {
    return NextResponse.next();
  }

  // Already unlocked in this browser — the /api/login cookie is the session,
  // scoped to the whole site so one prompt covers every page.
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
  // Exclude Next.js internals; everything else is gated by the logic above.
  matcher: ["/((?!_next/static|_next/image).*)"],
};

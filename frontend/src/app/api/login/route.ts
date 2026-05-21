import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "epm-auth";
const COOKIE_MAX_AGE_DAYS = 30;

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function isSafeRedirect(target: string): boolean {
  // Only allow same-origin paths starting with "/" and not "//" or "/\".
  return /^\/(?![\\/])/.test(target);
}

export async function POST(req: NextRequest) {
  const sitePassword = process.env.SITE_PASSWORD;
  if (!sitePassword) {
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 500 });
  }

  let body: { password?: string; from?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (body.password !== sitePassword) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const from = body.from && isSafeRedirect(body.from) ? body.from : "/";
  const hash = await sha256Hex(sitePassword);
  const res = NextResponse.json({ ok: true, from });
  res.cookies.set(COOKIE_NAME, hash, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE_DAYS * 24 * 60 * 60,
  });
  return res;
}

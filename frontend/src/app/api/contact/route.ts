import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, subject, message, organization } = body ?? {};

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "name, email, subject and message are required" },
      { status: 400 }
    );
  }

  console.log("[contact form]", { name, email, subject, message, organization });

  return NextResponse.json({ success: true });
}

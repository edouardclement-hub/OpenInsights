import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  // TODO: Add your email sending logic here (e.g., Resend, SendGrid, Nodemailer)
  // For now, we just log the submission
  console.log("Contact form submission:", { name, email, message });

  return NextResponse.json({ success: true });
}

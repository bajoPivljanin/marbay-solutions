import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name: rawName, email, message } = body as Record<string, unknown>;
  const name = typeof rawName === "string" ? rawName.trim() : "";
  const senderEmail = typeof email === "string" ? email.trim() : "";
  const inquiryMessage = typeof message === "string" ? message.trim() : "";

  if (!name || name.length > 200) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!senderEmail || !EMAIL_RE.test(senderEmail) || senderEmail.length > 254) {
    return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
  }
  if (!inquiryMessage || inquiryMessage.length > 5000) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  const to = process.env.INQUIRY_TO_EMAIL ?? "hello@marbaysolutions.com";
  const from =
    process.env.INQUIRY_FROM_EMAIL ?? "MarBay Solutions <onboarding@resend.dev>";

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: senderEmail,
    subject: `New Contact Inquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${senderEmail}\n\n${inquiryMessage}`,
    html: `
      <h2>New Contact Inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(senderEmail)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(inquiryMessage).replace(/\n/g, "<br>")}</p>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

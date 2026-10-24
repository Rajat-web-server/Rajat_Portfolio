import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const website = String(body.website ?? ""); // honeypot

  // Bots fill the hidden field. Pretend success and drop it.
  if (website) return NextResponse.json({ ok: true });

  if (name.length < 2 || name.length > 80)
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!EMAIL_RE.test(email) || email.length > 120)
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  if (message.length < 10 || message.length > 2000)
    return NextResponse.json(
      { error: "Message must be 10 to 2000 characters." },
      { status: 400 }
    );

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  // No email configured: log in dev so you can test the form
  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.log("Contact (email not configured):", { name, email, message });
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Email is not configured." }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Could not send message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
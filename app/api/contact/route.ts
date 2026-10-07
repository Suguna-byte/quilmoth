import { NextResponse } from "next/server";

/**
 * POST /api/contact
 * Validates the brief on the server. To receive briefs for real, send `brief`
 * on with an email service (Resend, Postmark) or save it to a database where the TODO is.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ errors: { form: "The form data couldn't be read. Refresh and try again." } }, { status: 400 });
  }

  const str = (k: string) => (typeof body[k] === "string" ? (body[k] as string).trim() : "");
  const name = str("name"), contact = str("contact"), message = str("message");

  // Honeypot filled in: pretend it worked so the bot moves on.
  if (str("website")) return NextResponse.json({ ok: true, ticket: "QM-000" });

  const errors: Record<string, string> = {};
  if (!name || name.length > 100) errors.name = "Add your name (up to 100 characters).";
  if (!contact || contact.length > 200) errors.contact = "Add an email or handle we can reach you on.";
  if (message.length < 20 || message.length > 5000) errors.message = "Write between 20 and 5,000 characters.";
  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 422 });

  const ticket = /^QM-\d{3}$/.test(str("ticket")) ? str("ticket") : `QM-${Math.floor(100 + Math.random() * 900)}`;
  const brief = { ticket, name, contact, message, receivedAt: new Date().toISOString() };

  // TODO: deliver the brief (email service or database).
  console.log("[contact] new brief", brief);

  return NextResponse.json({ ok: true, ticket });
}

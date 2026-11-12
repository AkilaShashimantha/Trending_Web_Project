import { NextResponse } from "next/server";
import { z } from "zod";

const SUPPORT_EMAIL = "support@taxestimator.online";

const contactPayloadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name (at least 2 characters).")
    .max(120, "Name must be 120 characters or fewer."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(254, "Email address is too long."),
  subject: z
    .string()
    .trim()
    .min(2, "Please select or enter an inquiry topic.")
    .max(160, "Subject must be 160 characters or fewer."),
  message: z
    .string()
    .trim()
    .min(10, "Please enter a message of at least 10 characters.")
    .max(5000, "Message must be 5,000 characters or fewer."),
  website: z.string().max(200).optional().default(""),
});

function buildMailtoUrl(name: string, email: string, subject: string, message: string): string {
  const emailSubject = `[TaxEstimator Online] ${subject}`;
  const emailBody = `From: ${name} <${email}>\nTopic: ${subject}\n\n${message}`;
  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
}

export async function POST(request: Request) {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        delivered: false,
        status: "validation_error",
        error: "Invalid JSON request body.",
      },
      { status: 400 }
    );
  }

  const parsed = contactPayloadSchema.safeParse(rawBody);
  if (!parsed.success) {
    const flattened = parsed.error.flatten();
    return NextResponse.json(
      {
        ok: false,
        delivered: false,
        status: "validation_error",
        error: "Please check the highlighted fields and try again.",
        fieldErrors: flattened.fieldErrors,
      },
      { status: 400 }
    );
  }

  const { name, email, subject, message, website } = parsed.data;

  // Honeypot trap against automated bot submissions
  if (website.trim().length > 0) {
    return NextResponse.json(
      {
        ok: true,
        delivered: false,
        status: "filtered",
        message: "Submission filtered.",
      },
      { status: 200 }
    );
  }

  const mailtoUrl = buildMailtoUrl(name, email, subject, message);
  const resendApiKey = process.env.RESEND_API_KEY?.trim();

  if (!resendApiKey) {
    return NextResponse.json(
      {
        ok: false,
        delivered: false,
        status: "transport_not_configured",
        message:
          "Automated server email forwarding is not configured in this environment. Please use the pre-filled email button or direct email address below to send your message.",
        supportEmail: SUPPORT_EMAIL,
        mailtoUrl,
      },
      { status: 501 }
    );
  }

  const toEmail = process.env.CONTACT_TO_EMAIL?.trim() || SUPPORT_EMAIL;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    "TaxEstimator Online <noreply@taxestimator.online>";

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `[TaxEstimator Online Contact] ${subject}`,
        text: [
          `Name: ${name}`,
          `Reply Email: ${email}`,
          `Topic: ${subject}`,
          "",
          "Message:",
          message,
        ].join("\n"),
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text().catch(() => "");
      console.error("Resend contact delivery failed:", resendResponse.status, errorText);
      return NextResponse.json(
        {
          ok: false,
          delivered: false,
          status: "transport_error",
          message:
            "Our automated email relay could not complete delivery right now. Please use the pre-filled email action or copy our support address below.",
          supportEmail: SUPPORT_EMAIL,
          mailtoUrl,
        },
        { status: 502 }
      );
    }

    const resendData = (await resendResponse.json().catch(() => ({}))) as { id?: string };

    return NextResponse.json(
      {
        ok: true,
        delivered: true,
        status: "sent",
        id: resendData.id ?? null,
        message:
          "Your message has been delivered to the TaxEstimator Online desk. We review inquiries within 1-2 business days.",
        supportEmail: SUPPORT_EMAIL,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Unexpected error forwarding contact message:", err);
    return NextResponse.json(
      {
        ok: false,
        delivered: false,
        status: "transport_error",
        message:
          "Network error reaching email delivery service. Please send directly via your mail client using the options below.",
        supportEmail: SUPPORT_EMAIL,
        mailtoUrl,
      },
      { status: 502 }
    );
  }
}

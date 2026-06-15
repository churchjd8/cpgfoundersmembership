import { NextResponse } from "next/server";
import { AGREEMENT_VERSION, ENGAGEMENT } from "@/lib/jade-agreement";

// Records Jade's signed agreement by emailing a durable record (with the
// signature image attached) to the team. Mirrors the Resend-via-fetch pattern
// used elsewhere in this app.
export async function POST(request: Request) {
  try {
    const { fullName, email, signatureImage, agreementVersion, signedAt } =
      await request.json();

    if (!fullName || !email || !signatureImage) {
      return NextResponse.json(
        { error: "Name, email, and signature are required." },
        { status: 400 },
      );
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";
    const signedTime = new Date(signedAt || Date.now()).toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
    });

    const notifyTo =
      process.env.CONTACT_FORM_NOTIFY_EMAIL ||
      process.env.STRIPE_FAILURE_NOTIFY_EMAIL;

    // Strip the data-URL prefix to get raw base64 for the attachment.
    const base64 = String(signatureImage).replace(/^data:image\/\w+;base64,/, "");

    if (notifyTo && process.env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "CPG Founders Group <onboarding@resend.dev>",
          to: notifyTo,
          reply_to: email,
          subject: `✍️ Signed Advisory Agreement — ${fullName} (${ENGAGEMENT.business})`,
          html: `
            <h2>Advisory Services Agreement signed</h2>
            <table style="border-collapse:collapse;font-family:sans-serif;">
              <tr><td style="padding:8px;font-weight:bold;">Signer</td><td style="padding:8px;">${fullName}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;">Business</td><td style="padding:8px;">${ENGAGEMENT.business}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;">${email}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;">Agreement version</td><td style="padding:8px;">${agreementVersion || AGREEMENT_VERSION}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;">Signed at (PT)</td><td style="padding:8px;">${signedTime}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;">IP</td><td style="padding:8px;">${ip}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;">User agent</td><td style="padding:8px;">${userAgent}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;">Terms</td><td style="padding:8px;">$${ENGAGEMENT.initialFeeUsd}/mo for ${ENGAGEMENT.initialMonths} months, then $${ENGAGEMENT.ongoingFeeUsd}/mo month-to-month</td></tr>
            </table>
            <p style="margin-top:16px;">Signature image attached.</p>
          `,
          attachments: base64
            ? [{ filename: `signature-${fullName.replace(/\s+/g, "-")}.png`, content: base64 }]
            : undefined,
        }),
      });
      if (!res.ok) {
        const err = await res.text();
        console.error("Resend (sign) error:", err.slice(0, 300));
      }
    } else {
      console.warn("Sign recorded but notify email not configured.");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Jade onboarding sign error:", err);
    return NextResponse.json(
      { error: "Could not record your signature." },
      { status: 500 },
    );
  }
}

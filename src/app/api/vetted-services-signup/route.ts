import { NextResponse } from "next/server";

const VETTED_FORM_ID = "2149606810";

async function getKajabiToken() {
  const res = await fetch("https://api.kajabi.com/v1/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.KAJABI_API_KEY!,
      client_secret: process.env.KAJABI_API_SECRET!,
      grant_type: "client_credentials",
    }),
  });

  if (!res.ok) throw new Error("Failed to authenticate with Kajabi");
  const data = await res.json();
  return data.access_token as string;
}

async function sendNotificationEmail(fields: { firstName: string; email: string }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "CPG Founders Group <onboarding@resend.dev>",
      to: process.env.CONTACT_FORM_NOTIFY_EMAIL!,
      reply_to: fields.email,
      subject: `Vetted Services waitlist: ${fields.firstName}`,
      html: `
        <h2>New Vetted Services Waitlist Signup</h2>
        <p><strong>First name:</strong> ${fields.firstName}</p>
        <p><strong>Email:</strong> ${fields.email}</p>
        <hr>
        <p style="color:#999;font-size:12px;">Submitted from cpgfoundersgroup.com/vetted-services</p>
      `,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    console.error("Resend error:", err);
  }
}

export async function POST(request: Request) {
  try {
    const { firstName, email } = await request.json();

    if (!firstName || !email) {
      return NextResponse.json(
        { error: "First name and email are required" },
        { status: 400 },
      );
    }

    const accessToken = await getKajabiToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/vnd.api+json",
    };

    const formRes = await fetch(
      `https://api.kajabi.com/v1/forms/${VETTED_FORM_ID}/submit`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          data: {
            type: "form_submissions",
            attributes: {
              name: firstName,
              email,
              custom_3: "Type: Waitlist signup",
            },
          },
        }),
      },
    );

    if (!formRes.ok) {
      const errText = await formRes.text();
      console.error(`Vetted services waitlist Kajabi submit failed (${formRes.status}): ${errText.slice(0, 300)}`);
    }

    await sendNotificationEmail({ firstName, email });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Vetted services waitlist error:", err);
    const msg = err instanceof Error ? err.message : "Something went wrong";
    return NextResponse.json(
      { error: "Something went wrong", detail: msg },
      { status: 500 },
    );
  }
}

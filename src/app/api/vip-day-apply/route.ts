import { NextResponse } from "next/server";

const VIP_DAY_FORM_ID = "2149550479";

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

async function sendNotificationEmail(fields: {
  firstName: string;
  lastName: string;
  email: string;
  business: string;
  website?: string;
  revenue: string;
  challenge: string;
  breakthrough: string;
  referral?: string;
}) {
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
      subject: `🔥 VIP Day Application: ${fields.firstName} ${fields.lastName} (${fields.business})`,
      html: `
        <h2>New VIP Day Application</h2>
        <p><strong>Name:</strong> ${fields.firstName} ${fields.lastName}</p>
        <p><strong>Email:</strong> ${fields.email}</p>
        <p><strong>Business:</strong> ${fields.business}</p>
        ${fields.website ? `<p><strong>Website:</strong> ${fields.website}</p>` : ""}
        <p><strong>Revenue:</strong> ${fields.revenue}</p>
        <hr>
        <p><strong>Biggest challenge right now:</strong></p>
        <p>${fields.challenge.replace(/\n/g, "<br>")}</p>
        <hr>
        <p><strong>What a breakthrough looks like in 90 days:</strong></p>
        <p>${fields.breakthrough.replace(/\n/g, "<br>")}</p>
        ${fields.referral ? `<hr><p><strong>How they heard about Jeff:</strong> ${fields.referral}</p>` : ""}
        <hr>
        <p style="color:#999;font-size:12px;">Submitted from cpgfoundersgroup.com/vip-day-apply</p>
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
    const { firstName, lastName, email, business, website, revenue, challenge, breakthrough, referral } =
      await request.json();

    if (!firstName || !lastName || !email || !business || !revenue || !challenge || !breakthrough) {
      return NextResponse.json(
        { error: "All required fields must be filled out" },
        { status: 400 },
      );
    }

    const accessToken = await getKajabiToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/vnd.api+json",
    };

    // Submit through the Kajabi "VIP Day Application" form.
    // Kajabi handles contact creation, tagging, and automations.
    // Field mapping (matches form field order in Kajabi):
    //   name      → First Name
    //   email     → Email
    //   custom_1  → Last Name
    //   custom_2  → Business Name
    //   custom_3  → Business website (if applicable)
    //   custom_4  → Revenue (radio buttons)
    //   custom_5  → Biggest challenge
    //   custom_6  → Breakthrough in 90 days
    //   custom_7  → How did you hear about Jeff
    const formRes = await fetch(
      `https://api.kajabi.com/v1/forms/${VIP_DAY_FORM_ID}/submit`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          data: {
            type: "form_submissions",
            attributes: {
              name: firstName,
              email,
              custom_1: lastName,
              custom_2: business,
              custom_3: website || "",
              custom_4: revenue,
              custom_5: challenge,
              custom_6: breakthrough,
              custom_7: referral || "",
            },
          },
        }),
      },
    );

    if (!formRes.ok) {
      const errText = await formRes.text();
      console.error(`Kajabi form submit failed (${formRes.status}): ${errText.slice(0, 300)}`);
    }

    // Also send notification email to team
    await sendNotificationEmail({
      firstName,
      lastName,
      email,
      business,
      website,
      revenue,
      challenge,
      breakthrough,
      referral,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("VIP Day application error:", err);
    const message = err instanceof Error ? err.message : "Something went wrong";
    return NextResponse.json(
      { error: "Something went wrong", detail: message },
      { status: 500 },
    );
  }
}

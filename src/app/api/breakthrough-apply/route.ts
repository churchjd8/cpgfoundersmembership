import { NextResponse } from "next/server";

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
  name: string;
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
      subject: `🔥 90-Day Breakthrough Application: ${fields.name} (${fields.business})`,
      html: `
        <h2>New 90-Day Breakthrough Application</h2>
        <p><strong>Name:</strong> ${fields.name}</p>
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
        <p style="color:#999;font-size:12px;">Submitted from cpgfoundersgroup.com/90-day-breakthrough-apply</p>
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
    const { name, email, business, website, revenue, challenge, breakthrough, referral } =
      await request.json();

    if (!name || !email || !business || !revenue || !challenge || !breakthrough) {
      return NextResponse.json(
        { error: "All required fields must be filled out" },
        { status: 400 }
      );
    }

    const accessToken = await getKajabiToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/vnd.api+json",
    };

    // 1. Create contact in Kajabi
    const contactRes = await fetch("https://api.kajabi.com/v1/contacts", {
      method: "POST",
      headers,
      body: JSON.stringify({
        data: {
          type: "contacts",
          attributes: { name, email, subscribed: true },
          relationships: {
            site: {
              data: { type: "sites", id: process.env.KAJABI_SITE_ID! },
            },
          },
        },
      }),
    });

    let contactId: string | null = null;

    if (contactRes.ok) {
      const contactData = await contactRes.json();
      contactId = contactData.data.id;
    } else {
      // Contact may already exist - search for them
      const searchRes = await fetch(
        `https://api.kajabi.com/v1/contacts?filter[email_contains]=${encodeURIComponent(email)}`,
        { headers }
      );
      if (searchRes.ok) {
        const searchData = await searchRes.json();
        const match = searchData.data?.find(
          (c: { attributes: { email: string } }) =>
            c.attributes.email.toLowerCase() === email.toLowerCase()
        );
        if (match) {
          contactId = match.id;
        }
      }
    }

    if (contactId) {
      // 2. Add application details as a contact note
      const noteBody = [
        `90-Day Breakthrough Application`,
        ``,
        `Business: ${business}`,
        website ? `Website: ${website}` : null,
        `Revenue: ${revenue}`,
        ``,
        `Biggest challenge:`,
        challenge,
        ``,
        `What a breakthrough looks like:`,
        breakthrough,
        referral ? `\nReferral source: ${referral}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      await fetch("https://api.kajabi.com/v1/contact_notes", {
        method: "POST",
        headers,
        body: JSON.stringify({
          data: {
            type: "contact_notes",
            attributes: { body: noteBody },
            relationships: {
              contact: {
                data: { type: "contacts", id: contactId },
              },
            },
          },
        }),
      });

      // 3. Apply "90-Day Breakthrough Application" tag
      const tagSearchRes = await fetch(
        `https://api.kajabi.com/v1/contact_tags?filter[site_id]=${process.env.KAJABI_SITE_ID!}&filter[name_cont]=${encodeURIComponent("90-Day Breakthrough Application")}`,
        { headers }
      );

      if (tagSearchRes.ok) {
        const tagData = await tagSearchRes.json();
        const matchingTag = tagData.data?.find(
          (t: { attributes: { name: string } }) =>
            t.attributes.name === "90-Day Breakthrough Application"
        );

        if (matchingTag) {
          await fetch(
            `https://api.kajabi.com/v1/contacts/${contactId}/relationships/tags`,
            {
              method: "POST",
              headers,
              body: JSON.stringify({
                data: [{ type: "contact_tags", id: matchingTag.id }],
              }),
            }
          );
        }
      }
    }

    // 4. Send notification email to team
    await sendNotificationEmail({
      name,
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
    console.error("Breakthrough application error:", err);
    const message = err instanceof Error ? err.message : "Something went wrong";
    return NextResponse.json(
      { error: "Something went wrong", detail: message },
      { status: 500 }
    );
  }
}

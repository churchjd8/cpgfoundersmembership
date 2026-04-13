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
  stage: string;
  interest: string;
  message: string;
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
      subject: `New contact form: ${fields.name} - ${fields.interest}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${fields.name}</p>
        <p><strong>Email:</strong> ${fields.email}</p>
        <p><strong>Business:</strong> ${fields.business}</p>
        ${fields.website ? `<p><strong>Website:</strong> ${fields.website}</p>` : ""}
        <p><strong>Stage:</strong> ${fields.stage}</p>
        <p><strong>Interest:</strong> ${fields.interest}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${fields.message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p style="color:#999;font-size:12px;">Submitted from cpgfoundersgroup.com</p>
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
    const { name, email, business, website, stage, interest, message } =
      await request.json();

    if (!name || !email || !business || !stage || !interest || !message) {
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

    // 2. Add contact note with full form details
    if (contactId) {
      const noteBody = [
        `Contact form submission from cpgfoundersgroup.com`,
        ``,
        `Business: ${business}`,
        website ? `Website: ${website}` : null,
        `Stage: ${stage}`,
        `Interest: ${interest}`,
        ``,
        `Message:`,
        message,
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
    }

    // 3. Send email notification
    await sendNotificationEmail({
      name,
      email,
      business,
      website,
      stage,
      interest,
      message,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

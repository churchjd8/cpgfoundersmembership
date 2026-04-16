import { NextResponse } from "next/server";

const WORKSHOP_FORM_ID = "2149524450";

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

export async function POST(request: Request) {
  try {
    const { name, email, business, stage } = await request.json();

    if (!name || !email || !business) {
      return NextResponse.json(
        { error: "Name, email, and business name are required" },
        { status: 400 }
      );
    }

    const accessToken = await getKajabiToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/vnd.api+json",
    };

    // Create the contact first so we have their ID for the note
    const contactRes = await fetch("https://api.kajabi.com/v1/contacts", {
      method: "POST",
      headers,
      body: JSON.stringify({
        data: {
          type: "contacts",
          attributes: { name, email, custom_2: business, subscribed: true },
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
      contactId = contactData.data?.id ?? null;
    }

    // Submit through the Kajabi workshop form to trigger automations/tags
    await fetch(
      `https://api.kajabi.com/v1/forms/${WORKSHOP_FORM_ID}/submit`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          data: {
            type: "form_submissions",
            attributes: { name, email, custom_2: business },
          },
        }),
      }
    );

    // Add a note with the stage info using the contact ID we already have
    if (stage && contactId) {
      await fetch("https://api.kajabi.com/v1/contact_notes", {
        method: "POST",
        headers,
        body: JSON.stringify({
          data: {
            type: "contact_notes",
            attributes: {
              body: `Burn Rate Workshop signup from cpgfoundersgroup.com\nBrand Stage: ${stage}`,
            },
            relationships: {
              contact: {
                data: { type: "contacts", id: contactId },
              },
            },
          },
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Workshop signup error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

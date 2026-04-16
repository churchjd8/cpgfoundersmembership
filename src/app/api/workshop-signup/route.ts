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

    // Submit through the Kajabi workshop form (custom_2 = Business Name)
    const formRes = await fetch(
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

    if (!formRes.ok) {
      // If form submit fails, try creating contact directly
      await fetch("https://api.kajabi.com/v1/contacts", {
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
    }

    // Add a note with the stage info — wait briefly for Kajabi to index the contact
    if (stage) {
      await new Promise((r) => setTimeout(r, 5000));
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
                    data: { type: "contacts", id: match.id },
                  },
                },
              },
            }),
          });
        }
      }
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

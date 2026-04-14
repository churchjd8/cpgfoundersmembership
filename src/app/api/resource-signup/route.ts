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

export async function POST(request: Request) {
  try {
    const { name, email, resource, stage, challenge } = await request.json();

    if (!name || !email || !resource) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const accessToken = await getKajabiToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/vnd.api+json",
    };

    // Create contact in Kajabi
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
      // Contact may already exist
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
      // Look up the Kajabi tag by resource name and apply it
      const tagSearchRes = await fetch(
        `https://api.kajabi.com/v1/contact_tags?filter[site_id]=${process.env.KAJABI_SITE_ID!}&filter[name_cont]=${encodeURIComponent(resource)}`,
        { headers }
      );

      if (tagSearchRes.ok) {
        const tagData = await tagSearchRes.json();
        const matchingTag = tagData.data?.find(
          (t: { attributes: { name: string } }) =>
            t.attributes.name === resource
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

      // Add a note with resource request details
      await fetch("https://api.kajabi.com/v1/contact_notes", {
        method: "POST",
        headers,
        body: JSON.stringify({
          data: {
            type: "contact_notes",
            attributes: {
              body: `Free resource request from cpgfoundersgroup.com/resources\n\nResource: ${resource}\nBusiness Stage: ${stage || "Not provided"}\nBiggest Challenge: ${challenge || "Not provided"}`,
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
    console.error("Resource signup error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

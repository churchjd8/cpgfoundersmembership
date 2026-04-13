import { NextResponse } from "next/server";

async function getAccessToken() {
  const res = await fetch("https://api.kajabi.com/v1/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.KAJABI_API_KEY!,
      client_secret: process.env.KAJABI_API_SECRET!,
      grant_type: "client_credentials",
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to authenticate with Kajabi");
  }

  const data = await res.json();
  return data.access_token as string;
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

    const accessToken = await getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/vnd.api+json",
    };

    // Submit through the Kajabi form - this triggers automations, tags, and notifications
    const formId = process.env.KAJABI_CONTACT_FORM_ID || process.env.KAJABI_DEFAULT_FORM_ID!;
    const formRes = await fetch(
      `https://api.kajabi.com/v1/forms/${formId}/submit`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          data: {
            type: "form_submissions",
            attributes: { name, email },
          },
        }),
      }
    );

    // Get the contact ID - either from form submission or by searching
    let contactId: string | null = null;

    if (formRes.ok) {
      // Form submission succeeded - find the contact by email
      const searchRes = await fetch(
        `https://api.kajabi.com/v1/contacts?filter[email]=${encodeURIComponent(email)}`,
        { headers }
      );
      if (searchRes.ok) {
        const searchData = await searchRes.json();
        if (searchData.data && searchData.data.length > 0) {
          contactId = searchData.data[0].id;
        }
      }
    } else {
      // Form submit failed (maybe contact exists) - try creating directly
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

      if (contactRes.ok) {
        const contactData = await contactRes.json();
        contactId = contactData.data.id;
      } else {
        // Contact already exists - search for them
        const searchRes = await fetch(
          `https://api.kajabi.com/v1/contacts?filter[email]=${encodeURIComponent(email)}`,
          { headers }
        );
        if (searchRes.ok) {
          const searchData = await searchRes.json();
          if (searchData.data && searchData.data.length > 0) {
            contactId = searchData.data[0].id;
          }
        }
      }
    }

    // Add a note with the full form details
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

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

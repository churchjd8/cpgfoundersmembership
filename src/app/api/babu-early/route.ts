import { NextResponse } from "next/server";

const BABU_FORM_ID = "2149419850";

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
    const { name, email, business } = await request.json();

    if (!name || !email || !business) {
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

    // Submit through the Kajabi Babu AI Beta Access form
    const formRes = await fetch(
      `https://api.kajabi.com/v1/forms/${BABU_FORM_ID}/submit`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          data: {
            type: "form_submissions",
            attributes: {
              name,
              email,
              custom_2: business,
            },
          },
        }),
      }
    );

    if (!formRes.ok) {
      const err = await formRes.json();
      console.error("Kajabi form error:", err);
      // Fallback: create contact directly
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

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Babu early access error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

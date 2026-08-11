import { NextResponse } from "next/server";

// "CPT Book Waitlist" — The Cold-Pressed Truth launch list.
const BOOK_WAITLIST_FORM_ID = "2149690454";

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

  if (!res.ok) throw new Error("Failed to authenticate with Kajabi");
  const data = await res.json();
  return data.access_token as string;
}

export async function POST(request: Request) {
  try {
    const { email, first_name } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const accessToken = await getAccessToken();

    // Submit through the form rather than creating the contact directly —
    // Kajabi applies the waitlist tag via the form's own automation.
    const formRes = await fetch(
      `https://api.kajabi.com/v1/forms/${BOOK_WAITLIST_FORM_ID}/submit`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/vnd.api+json",
        },
        body: JSON.stringify({
          data: {
            type: "form_submissions",
            attributes: {
              name: first_name || "",
              email,
            },
          },
        }),
      }
    );

    if (!formRes.ok) {
      const errText = await formRes.text();
      console.error(
        `Book waitlist signup failed (${formRes.status}): ${errText.slice(0, 200)}`
      );
      return NextResponse.json({ error: "Failed to sign up" }, { status: 500 });
    }

    console.log(`Book waitlist: ${first_name} <${email}>`);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Book waitlist error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

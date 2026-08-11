import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { phoneKey, toE164 } from "@/lib/phone";

const WHATSAPP_FORM_ID = "2149419862";

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
    const { name, email, business, stage, revenue, team, phone } =
      await request.json();

    if (!name || !email || !business || !stage || !revenue || !team || !phone) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // The number is how we verify the WhatsApp join request later, so a bad one
    // is worse than none — reject it here rather than storing junk.
    const phoneE164 = toE164(String(phone));
    if (!phoneE164) {
      return NextResponse.json(
        { error: "Please enter a valid WhatsApp number, including country code." },
        { status: 400 }
      );
    }

    // Kajabi is the marketing list; Supabase is the verification record. Write
    // ours first so a Kajabi hiccup can't lose the number.
    const supabase = getSupabaseAdmin();
    const supabasePromise = supabase
      ? supabase
          .from("whatsapp_signups")
          .insert({
            name,
            email,
            business,
            stage,
            revenue,
            team,
            phone_raw: String(phone),
            phone_e164: phoneE164,
            phone_key: phoneKey(phoneE164),
          })
          .then(({ error }) => {
            if (error) console.error("whatsapp_signups insert error:", error);
          })
      : Promise.resolve();

    try {
      const accessToken = await getKajabiToken();
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/vnd.api+json",
      };

      // Submit through the Kajabi WhatsApp Group form
      // custom_2 = Business Name, custom_3 = Brand Stage, custom_4 = Revenue, custom_5 = Team Size
      // The phone number deliberately stays out of Kajabi — the form has no field
      // for it, and Kajabi drops values for fields that don't exist. It lives in
      // the whatsapp_signups table instead.
      const formRes = await fetch(
        `https://api.kajabi.com/v1/forms/${WHATSAPP_FORM_ID}/submit`,
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
                custom_3: stage,
                custom_4: revenue,
                custom_5: team,
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
    } finally {
      // Always settle the write, even if Kajabi threw — otherwise the insert can
      // be cut off when the serverless function freezes.
      await supabasePromise;
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Founders Only signup error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

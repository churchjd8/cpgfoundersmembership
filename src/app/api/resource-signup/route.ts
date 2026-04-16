import { NextResponse } from "next/server";

const RESOURCES_FORM_ID = "2149549966";

const TAG_IDS: Record<string, string> = {
  "All Free Resources Bundle": "2150128581",
  "Fundraising Masterclass Replay (3 Hours)": "2150128582",
  "CPG Chart of Accounts": "2150128583",
  "Capital Raise & Runway Calculator": "2150128584",
  "Unit Pricing & Break-Even Model": "2150128587",
  "Suja Lessons Learned (white paper)": "2150128588",
  "CPG Fatal Flaws (white paper)": "2150128589",
  "CPG Playbook Video Replay": "2150128590",
};

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

  if (!res.ok) throw new Error(`Kajabi auth failed (${res.status})`);
  const data = await res.json();
  return data.access_token as string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, name, email, resource, stage, challenge } = body;

    const first = firstName || name || "";
    const last = lastName || "";
    const fullName = last ? `${first} ${last}` : first;

    if (!first || !email || !resource) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    console.log(`Resource signup: ${fullName} <${email}> requesting "${resource}"`);

    const accessToken = await getKajabiToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/vnd.api+json",
    };

    let contactId: string | null = null;

    // Step 1: Try creating contact directly — gives us the ID for tagging
    const contactRes = await fetch("https://api.kajabi.com/v1/contacts", {
      method: "POST",
      headers,
      body: JSON.stringify({
        data: {
          type: "contacts",
          attributes: {
            name: first,
            custom_1: last,
            custom_3: stage || "",
            custom_4: challenge || "",
            email,
            subscribed: true,
          },
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
      console.log(`Resource signup: created contact ${contactId}`);
    } else {
      // Contact exists (or ghost) — submit through form as fallback
      console.log(`Resource signup: contact create failed, using form submit`);
      const formRes = await fetch(
        `https://api.kajabi.com/v1/forms/${RESOURCES_FORM_ID}/submit`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            data: {
              type: "form_submissions",
              attributes: {
                name: first,
                email,
                custom_1: last,
                custom_3: stage || "",
              },
            },
          }),
        }
      );

      if (!formRes.ok) {
        console.error(`Resource signup: form submit also failed (${formRes.status})`);
        return NextResponse.json(
          { error: "Could not register contact" },
          { status: 500 }
        );
      }

      // Try to find the existing contact by email search
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
          console.log(`Resource signup: found existing contact ${contactId}`);

          // Update the existing contact's custom fields
          await fetch(`https://api.kajabi.com/v1/contacts/${contactId}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify({
              data: {
                type: "contacts",
                id: contactId,
                attributes: {
                  custom_3: stage || "",
                  custom_4: challenge || "",
                },
              },
            }),
          });
        }
      }
    }

    // Step 2: Submit through form for all contacts (triggers Kajabi automations)
    if (contactId) {
      // Only submit form if we created the contact (didn't already submit above)
      const alreadySubmittedForm = !contactRes.ok;
      if (!alreadySubmittedForm) {
        await fetch(
          `https://api.kajabi.com/v1/forms/${RESOURCES_FORM_ID}/submit`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({
              data: {
                type: "form_submissions",
                attributes: {
                  name: first,
                  email,
                  custom_1: last,
                  custom_3: stage || "",
                },
              },
            }),
          }
        );
      }
    }

    // Step 3: Apply tag and note if we found the contact
    if (contactId) {
      const tagId = TAG_IDS[resource];
      if (tagId) {
        await fetch(
          `https://api.kajabi.com/v1/contacts/${contactId}/relationships/tags`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({
              data: [{ type: "contact_tags", id: tagId }],
            }),
          }
        );
      }

      await fetch("https://api.kajabi.com/v1/contact_notes", {
        method: "POST",
        headers,
        body: JSON.stringify({
          data: {
            type: "contact_notes",
            attributes: {
              body: `Free resource request from cpgfoundersgroup.com/resources\n\nName: ${fullName}\nResource: ${resource}\nBusiness Stage: ${stage || "Not provided"}\nBiggest Challenge: ${challenge || "Not provided"}`,
            },
            relationships: {
              contact: {
                data: { type: "contacts", id: contactId },
              },
            },
          },
        }),
      });
    } else {
      console.log(`Resource signup: could not find contact ID for ${email} — form was submitted but tag/note skipped`);
    }

    // Always return success — the form submission went through even if we
    // couldn't find the contact ID for tagging
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resource signup error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

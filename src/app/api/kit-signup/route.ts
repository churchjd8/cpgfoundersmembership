import { NextResponse } from "next/server";
import { ALL_KITS_FORM_ID, ALL_KITS_TAG, KITS, getKit, type Kit } from "@/lib/kits";
import { escapeHtml, kitEmailHtml, kitEmailSubject, type KitEmailSource } from "@/lib/kit-email";

// One endpoint behind every free-resource opt-in on the site.
//
// Delivery is split deliberately:
//   Resend  — sends the email, because the copy lives in this repo
//   Kajabi  — gets the contact, the tag, the custom fields and a note
//
// The Kajabi side still goes through the same per-resource forms that have
// always been there, so the tag automations Jeff already built keep firing and
// nothing in the dashboard has to be rewired. The one manual change needed is
// switching OFF the delivery email on those form automations, otherwise a
// signup gets both this email and the old Kajabi one.

const FROM = "Jeff Church <jeff@cpgfoundersgroup.com>";
const REPLY_TO = "jeff@cpgfoundersgroup.com";

async function sendEmail(payload: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Resend ${res.status}: ${errText.slice(0, 300)}`);
  }
}

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

type Headers = Record<string, string>;

async function submitForm(
  headers: Headers,
  formId: string,
  fields: { first: string; last: string; email: string; stage: string },
) {
  const res = await fetch(`https://api.kajabi.com/v1/forms/${formId}/submit`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      data: {
        type: "form_submissions",
        attributes: {
          name: fields.first,
          email: fields.email,
          custom_1: fields.last,
          custom_3: fields.stage,
        },
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`Kit signup: form ${formId} failed (${res.status}): ${errText.slice(0, 200)}`);
  }
}

/**
 * Everything Kajabi needs, run as one best-effort block. A CRM hiccup must
 * never surface to a founder who just asked for a free spreadsheet — the email
 * is the thing that has to land, and that already went out by this point.
 */
async function syncToKajabi({
  kits,
  isAllKits,
  first,
  last,
  email,
  stage,
  challenge,
  source,
}: {
  kits: Kit[];
  isAllKits: boolean;
  first: string;
  last: string;
  email: string;
  stage: string;
  challenge: string;
  source: KitEmailSource;
}) {
  const accessToken = await getKajabiToken();
  const headers: Headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/vnd.api+json",
  };
  const fields = { first, last, email, stage };

  // The kit tag(s). "All three" has its own bundle form and tag.
  const formIds = isAllKits ? [ALL_KITS_FORM_ID] : kits.map((k) => k.kajabiFormId);

  // Plus any asset Kajabi is still the only one able to deliver.
  for (const kit of kits) {
    for (const item of kit.items) {
      if (item.deliveredVia === "kajabi" && item.legacyFormId) {
        formIds.push(item.legacyFormId);
      }
    }
  }

  for (const formId of [...new Set(formIds)]) {
    await submitForm(headers, formId, fields);
  }

  // custom_4 (challenge) isn't on the forms, so it goes through the contacts API.
  let contactId: string | null = null;

  const contactRes = await fetch("https://api.kajabi.com/v1/contacts", {
    method: "POST",
    headers,
    body: JSON.stringify({
      data: {
        type: "contacts",
        attributes: {
          name: first,
          custom_1: last,
          custom_3: stage,
          custom_4: challenge,
          email,
          subscribed: true,
        },
        relationships: {
          site: { data: { type: "sites", id: process.env.KAJABI_SITE_ID! } },
        },
      },
    }),
  });

  if (contactRes.ok) {
    contactId = (await contactRes.json()).data.id;
  } else {
    // Already a contact — find them so the fields and note still land.
    const searchRes = await fetch(
      `https://api.kajabi.com/v1/contacts?filter[email_contains]=${encodeURIComponent(email)}`,
      { headers },
    );
    if (searchRes.ok) {
      const searchData = await searchRes.json();
      const match = searchData.data?.find(
        (c: { attributes: { email: string } }) =>
          c.attributes.email.toLowerCase() === email.toLowerCase(),
      );
      if (match) {
        contactId = match.id;
        await fetch(`https://api.kajabi.com/v1/contacts/${contactId}`, {
          method: "PATCH",
          headers,
          body: JSON.stringify({
            data: {
              type: "contacts",
              id: contactId,
              attributes: { custom_3: stage, custom_4: challenge },
            },
          }),
        });
      }
    }
  }

  if (contactId) {
    const door = source === "toolbox" ? "the book (/toolbox)" : "the site (/resources)";
    const tags = isAllKits ? ALL_KITS_TAG : kits.map((k) => k.kajabiTag).join(", ");
    await fetch("https://api.kajabi.com/v1/contact_notes", {
      method: "POST",
      headers,
      body: JSON.stringify({
        data: {
          type: "contact_notes",
          attributes: {
            body: [
              `Free kit request from ${door}`,
              ``,
              `Name: ${first} ${last}`.trim(),
              `Kit: ${isAllKits ? "All three kits" : kits.map((k) => k.name).join(", ")}`,
              `Tag applied: ${tags}`,
              `Business Stage: ${stage || "Not provided"}`,
              `Biggest Challenge: ${challenge || "Not provided"}`,
            ].join("\n"),
          },
          relationships: {
            contact: { data: { type: "contacts", id: contactId } },
          },
        },
      }),
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const firstName = String(body.firstName || "").trim();
    const lastName = String(body.lastName || "").trim();
    const email = String(body.email || "").trim();
    const stage = String(body.stage || "").trim();
    const challenge = String(body.challenge || "").trim();
    const kitParam = String(body.kit || "all").trim();
    const source: KitEmailSource = body.source === "toolbox" ? "toolbox" : "resources";

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "First name, last name, and email are required" },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
    }

    const isAllKits = kitParam === "all";
    const kits = isAllKits ? KITS : [getKit(kitParam)].filter((k): k is Kit => Boolean(k));

    if (!kits.length) {
      console.error(`Kit signup: unknown kit "${kitParam}"`);
      return NextResponse.json({ error: "Unknown kit" }, { status: 400 });
    }

    // The kit itself. This one has to land, so a failure is a real failure.
    await sendEmail({
      from: FROM,
      to: email,
      reply_to: REPLY_TO,
      subject: kitEmailSubject(kits, source),
      html: kitEmailHtml({ firstName, kits, source }),
    });

    console.log(
      `Kit signup [${source}]: ${firstName} ${lastName} <${email}> -> ${isAllKits ? "all" : kitParam}`,
    );

    try {
      await syncToKajabi({
        kits,
        isAllKits,
        first: firstName,
        last: lastName,
        email,
        stage,
        challenge,
        source,
      });
    } catch (kajabiErr) {
      console.error("Kit signup: Kajabi sync failed", kajabiErr);
    }

    try {
      await sendEmail({
        from: "CPG Founders Group <scheduling@cpgfoundersgroup.com>",
        to: process.env.CONTACT_FORM_NOTIFY_EMAIL,
        reply_to: email,
        subject: `Kit signup (${source}): ${firstName} ${lastName}`,
        html: `
          <h2>New free-kit signup</h2>
          <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Kit:</strong> ${escapeHtml(isAllKits ? "All three kits" : kits[0].name)}</p>
          <p><strong>Stage:</strong> ${escapeHtml(stage || "Not provided")}</p>
          <p><strong>Challenge:</strong> ${escapeHtml(challenge || "Not provided")}</p>
          <hr>
          <p style="color:#999;font-size:12px;">Source: cpgfoundersgroup.com/${source}</p>
        `,
      });
    } catch (notifyErr) {
      console.error("Kit signup: notification email failed", notifyErr);
    }

    // Single-kit signups get dropped straight onto the kit page. The bundle has
    // no single home, so those stay on the success state.
    return NextResponse.json({
      success: true,
      redirectTo: isAllKits ? null : kits[0].page,
    });
  } catch (err) {
    console.error("Kit signup error:", err);
    const msg = err instanceof Error ? err.message : "Something went wrong";
    return NextResponse.json({ error: "Something went wrong", detail: msg }, { status: 500 });
  }
}

// Shared Kajabi form submission.
//
// We submit through a form rather than creating the contact directly so that
// Kajabi applies the form's own automation (tags, sequences) to the contact.

// "CPT Book Waitlist" — The Cold-Pressed Truth launch list.
export const BOOK_WAITLIST_FORM_ID = "2149690454";

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

/**
 * Submits a name/email (plus any custom_N fields the form defines) to a
 * Kajabi form. Throws if Kajabi rejects it.
 */
export async function submitToKajabiForm(
  formId: string,
  { name, email, ...custom }: { name?: string; email: string; [custom: `custom_${number}`]: string }
) {
  const accessToken = await getAccessToken();

  const res = await fetch(`https://api.kajabi.com/v1/forms/${formId}/submit`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/vnd.api+json",
    },
    body: JSON.stringify({
      data: {
        type: "form_submissions",
        attributes: { name: name || "", email, ...custom },
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(
      `Kajabi form ${formId} submit failed (${res.status}): ${errText.slice(0, 200)}`
    );
  }
}

/**
 * Grants a Kajabi offer to an email, for sales that happen outside Kajabi's
 * own checkout. Creates the contact if the email is new. Kajabi then creates
 * the customer login and sends its welcome email, and skips the grant if the
 * contact already has the offer. Throws if any step fails.
 */
export async function grantKajabiOffer(
  offerId: string,
  { name, email }: { name?: string; email: string }
) {
  const accessToken = await getAccessToken();
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/vnd.api+json",
  };

  let contactId: string | null = null;

  const createRes = await fetch("https://api.kajabi.com/v1/contacts", {
    method: "POST",
    headers,
    body: JSON.stringify({
      data: {
        type: "contacts",
        attributes: { name: name || "", email },
        relationships: {
          site: { data: { type: "sites", id: process.env.KAJABI_SITE_ID! } },
        },
      },
    }),
  });

  if (createRes.ok) {
    contactId = (await createRes.json()).data.id;
  } else {
    // Already a contact — find them by exact email.
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
      if (match) contactId = match.id;
    }
  }

  if (!contactId) {
    throw new Error(`Kajabi contact could not be created or found for ${email}`);
  }

  const grantRes = await fetch(
    `https://api.kajabi.com/v1/contacts/${contactId}/relationships/offers`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ data: [{ type: "offers", id: offerId }] }),
    }
  );

  if (!grantRes.ok) {
    const errText = await grantRes.text();
    throw new Error(
      `Kajabi offer ${offerId} grant failed (${grantRes.status}): ${errText.slice(0, 200)}`
    );
  }
}

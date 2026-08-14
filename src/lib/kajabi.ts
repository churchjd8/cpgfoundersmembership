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

/** Submits a name/email to a Kajabi form. Throws if Kajabi rejects it. */
export async function submitToKajabiForm(
  formId: string,
  { name, email }: { name?: string; email: string }
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
        attributes: { name: name || "", email },
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

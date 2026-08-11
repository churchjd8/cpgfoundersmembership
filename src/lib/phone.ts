// Phone normalization for matching WhatsApp join requests against form signups.
//
// WhatsApp shows a join request as a raw international number ("+1 (510) 325-5231")
// and a self-chosen display name. The display name is not a check — it is whatever
// the person typed. Matching on a normalized number is, so every signup stores one.

/** Digits-only E.164 (with leading +), or null if it can't be one. */
export function toE164(input: string, defaultCountry = "1"): string | null {
  if (!input) return null;

  const trimmed = input.trim();
  const hadPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return null;

  // Explicit country code — trust it.
  if (hadPlus) {
    return digits.length >= 8 && digits.length <= 15 ? `+${digits}` : null;
  }

  // Bare NANP number, or one with a leading trunk "1".
  if (digits.length === 10) return `+${defaultCountry}${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;

  // Anything else without a "+" is ambiguous. Accept plausible international
  // lengths rather than dropping a real founder over a missing plus sign.
  return digits.length >= 8 && digits.length <= 15 ? `+${digits}` : null;
}

/** Loose key for comparing two numbers that may disagree on country code. */
export function phoneKey(e164: string): string {
  const digits = e164.replace(/\D/g, "");
  // Last 10 digits catches the "+1 555..." vs "555..." case without
  // collapsing genuinely different international numbers.
  return digits.slice(-10);
}

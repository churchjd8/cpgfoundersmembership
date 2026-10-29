// Bot screening for the /apply form (POST /api/work-with-jeff).
//
// Two layers:
// - "bot": the hidden honeypot field was filled, or the form was submitted too
//   fast (or without the timestamp the real form always sends). These are
//   dropped silently.
// - "likely-spam": the answers read as random strings (e.g. "Lggfmlh
//   Eecxdidzc", "QWjrSBsmTopCPuDVxze"). These skip Kajabi but still reach the
//   team inbox under a "Likely spam" subject, so a real founder is never lost.

export const HONEYPOT_FIELD = "hp_confirm_details";
export const MIN_FILL_MS = 4000;

export type SpamVerdict =
  | { kind: "ok" }
  | { kind: "bot"; reason: string }
  | { kind: "likely-spam"; reasons: string[] };

type Submission = {
  firstName?: string;
  lastName?: string;
  email?: string;
  business?: string;
  challenge?: string;
  breakthrough?: string;
  referral?: string;
  startedAt?: unknown;
  [HONEYPOT_FIELD]?: unknown;
};

// One word that no person or brand would type: a long run of consonants
// ("Lggfmlh", "cbrwqj") or capitals scattered through the middle
// ("QWjrSBsmTopCPuDVxze"). Real words top out around five consonants in a row
// ("strengths") and a couple of inner capitals ("McDonald", "iPhone").
export function looksRandom(word: string): boolean {
  const letters = word.replace(/[^A-Za-z]/g, "");
  if (letters.length < 6) return false;
  if (/[bcdfghjklmnpqrstvwxz]{6,}/i.test(letters)) return true;
  const isAllCaps = letters === letters.toUpperCase();
  const innerCaps = (letters.slice(1).match(/[A-Z]/g) || []).length;
  return !isAllCaps && innerCaps >= 4;
}

function hasRandomWord(text?: string): boolean {
  return (text || "").split(/\s+/).some(looksRandom);
}

// Bots love Gmail's dot trick: ucel.i.vu.hoge4.0@gmail.com.
function isDottedGmail(email?: string): boolean {
  const [local, domain] = (email || "").toLowerCase().split("@");
  return domain === "gmail.com" && (local.match(/\./g) || []).length >= 3;
}

export function screenApplication(data: Submission, now = Date.now()): SpamVerdict {
  const honeypot = data[HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { kind: "bot", reason: "honeypot filled" };
  }

  const startedAt = Number(data.startedAt);
  if (!Number.isFinite(startedAt) || startedAt <= 0) {
    return { kind: "bot", reason: "missing form timestamp" };
  }
  if (now - startedAt < MIN_FILL_MS) {
    return { kind: "bot", reason: `submitted in ${now - startedAt}ms` };
  }

  const reasons: string[] = [];
  if (hasRandomWord(`${data.firstName ?? ""} ${data.lastName ?? ""}`)) reasons.push("random name");
  if (hasRandomWord(data.business)) reasons.push("random business name");
  if (hasRandomWord(data.challenge)) reasons.push("random challenge answer");
  if (hasRandomWord(data.breakthrough)) reasons.push("random breakthrough answer");
  if (hasRandomWord(data.referral)) reasons.push("random referral answer");
  if (isDottedGmail(data.email)) reasons.push("dotted Gmail address");

  // Two signals, so one odd brand name or one dotted address alone never trips it.
  return reasons.length >= 2 ? { kind: "likely-spam", reasons } : { kind: "ok" };
}

// Verify WhatsApp group join requests against form signups.
//
// Paste the numbers from the WhatsApp pending-requests screen and get back who
// each one is. Exact E.164 match first, then a looser last-10-digits match for
// numbers entered without a country code.
//
// Run: npx tsx --env-file=.env scripts/whatsapp-verify.ts "+1 (510) 325-5231" "+17038671433"
//  or: pbpaste | npx tsx --env-file=.env scripts/whatsapp-verify.ts
import { createClient } from "@supabase/supabase-js";
import { phoneKey, toE164 } from "../src/lib/phone";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

async function readInput(): Promise<string[]> {
  if (process.argv.length > 2) return process.argv.slice(2);
  // Fall back to stdin so you can pipe a pasted block of numbers.
  const chunks: Buffer[] = [];
  for await (const chunk of process.stdin) chunks.push(chunk as Buffer);
  return Buffer.concat(chunks)
    .toString("utf8")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

async function main() {
  const raw = await readInput();
  if (!raw.length) {
    console.error("No numbers given. Pass them as arguments or pipe them in.");
    process.exit(1);
  }

  const supabase = createClient(url!, key!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: signups, error } = await supabase
    .from("whatsapp_signups")
    .select("name, email, business, stage, revenue, phone_e164, phone_key, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase query failed:", error.message);
    process.exit(1);
  }

  const byE164 = new Map<string, typeof signups>();
  const byKey = new Map<string, typeof signups>();
  for (const s of signups || []) {
    for (const [map, k] of [
      [byE164, s.phone_e164],
      [byKey, s.phone_key],
    ] as const) {
      if (!k) continue;
      const bucket = map.get(k) || [];
      bucket!.push(s);
      map.set(k, bucket);
    }
  }

  let matched = 0;
  const unmatched: string[] = [];

  for (const input of raw) {
    const e164 = toE164(input);
    if (!e164) {
      console.log(`❓ ${input}\n     could not parse as a phone number\n`);
      unmatched.push(input);
      continue;
    }

    const hits = byE164.get(e164) || byKey.get(phoneKey(e164)) || [];
    if (!hits.length) {
      console.log(`❌ ${e164}\n     NO SIGNUP FOUND — do not approve without asking\n`);
      unmatched.push(input);
      continue;
    }

    matched++;
    const exact = (byE164.get(e164) || []).length > 0;
    console.log(`✅ ${e164}${exact ? "" : "  (loose match — country code differed)"}`);
    for (const h of hits) {
      const when = new Date(h.created_at).toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
      });
      console.log(`     ${h.name} — ${h.business || "(no business)"}`);
      console.log(`     ${h.email} | ${h.revenue || "?"} | signed up ${when} PT`);
    }
    console.log("");
  }

  console.log(`— ${matched}/${raw.length} verified, ${unmatched.length} to review by hand.`);
}

main();

export {};

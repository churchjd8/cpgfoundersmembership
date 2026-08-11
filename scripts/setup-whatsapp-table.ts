// One-time: create the `whatsapp_signups` table via the Supabase Management API.
// This is the verification spine for the Founders Only WhatsApp group — Kajabi
// holds the marketing contact, this holds the phone number we approve against.
// Run: npx tsx --env-file=.env scripts/setup-whatsapp-table.ts
const ref = (process.env.SUPABASE_URL || "").match(/https:\/\/([a-z0-9]+)\.supabase\.co/)?.[1];
const token = process.env.SUPABASE_ACCESS_TOKEN;

if (!ref || !token) {
  console.error("Missing SUPABASE_URL or SUPABASE_ACCESS_TOKEN in .env");
  process.exit(1);
}

const sql = `
create table if not exists public.whatsapp_signups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  business text,
  stage text,
  revenue text,
  team text,
  phone_raw text not null,          -- exactly what they typed
  phone_e164 text not null,         -- normalized, what we match on
  phone_key text not null,          -- last 10 digits, loose match fallback
  approved_at timestamptz,          -- set when let into the group
  created_at timestamptz not null default now()
);
create index if not exists whatsapp_signups_e164_idx on public.whatsapp_signups (phone_e164);
create index if not exists whatsapp_signups_key_idx on public.whatsapp_signups (phone_key);
create index if not exists whatsapp_signups_email_idx on public.whatsapp_signups (lower(email));
create index if not exists whatsapp_signups_created_idx on public.whatsapp_signups (created_at desc);
`;

async function main() {
  const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: sql }),
  });
  if (!res.ok) {
    console.error(`Failed (${res.status}):`, await res.text());
    process.exit(1);
  }
  console.log("✅ whatsapp_signups table is ready.");
}

main();

export {};

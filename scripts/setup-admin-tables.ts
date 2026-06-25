// One-time: create the admin `admin_clients` table via the Supabase Management API.
// This is the CURATED layer (your list + tags/notes); the live roster spine is
// Stripe. We use a distinct name to avoid the pre-existing `clients` scaffold.
// Run: npx tsx --env-file=.env scripts/setup-admin-tables.ts
const ref = (process.env.SUPABASE_URL || "").match(/https:\/\/([a-z0-9]+)\.supabase\.co/)?.[1];
const token = process.env.SUPABASE_ACCESS_TOKEN;

if (!ref || !token) {
  console.error("Missing SUPABASE_URL or SUPABASE_ACCESS_TOKEN in .env");
  process.exit(1);
}

const sql = `
create table if not exists public.admin_clients (
  email text primary key,
  name text,
  business text,
  status text not null default 'active',
  stripe_customer_id text,
  on_roster boolean not null default true,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Call notes / recaps (e.g. from Granola via Deloris). The panel reads these;
-- Deloris (or any source) writes one row per meeting, keyed by client email.
create table if not exists public.call_notes (
  id uuid primary key default gen_random_uuid(),
  external_id text unique,            -- source note id, for idempotent upserts
  client_email text not null,         -- join key to clients/Stripe
  title text,
  meeting_date timestamptz,
  summary text,                       -- Granola's summary (markdown/plain)
  attendees text[] not null default '{}',
  source text not null default 'granola',
  created_at timestamptz not null default now()
);
create index if not exists call_notes_email_idx on public.call_notes (lower(client_email));
create index if not exists call_notes_date_idx on public.call_notes (meeting_date desc);
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
  console.log("✅ admin_clients table is ready.");
}

main();

export {};

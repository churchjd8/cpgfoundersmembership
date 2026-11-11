// One-time: create the `advisory_applications` table via the Supabase Management API.
// Holds every submission of the /apply form (POST /api/work-with-jeff), including
// the ones the bot screen drops, so no application can be lost silently.
// Run: npx tsx --env-file=.env scripts/setup-applications-table.ts
const ref = (process.env.SUPABASE_URL || "").match(/https:\/\/([a-z0-9]+)\.supabase\.co/)?.[1];
const token = process.env.SUPABASE_ACCESS_TOKEN;

if (!ref || !token) {
  console.error("Missing SUPABASE_URL or SUPABASE_ACCESS_TOKEN in .env");
  process.exit(1);
}

const sql = `
create table if not exists public.advisory_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text,
  last_name text,
  email text,
  business text,
  website text,
  revenue text,
  challenge text,
  breakthrough text,
  referral text,
  interest text,
  readiness text,                       -- ready | soon | session
  screen text not null default 'ok',    -- ok | likely-spam | bot
  screen_reason text,                   -- why the screen flagged it
  fill_ms integer,                      -- how long the form took to fill
  user_agent text,
  kajabi_ok boolean,                    -- null = not attempted
  email_ok boolean,                     -- null = not attempted
  error text                            -- anything that went wrong downstream
);
alter table public.advisory_applications enable row level security;
create index if not exists advisory_applications_created_idx on public.advisory_applications (created_at desc);
create index if not exists advisory_applications_email_idx on public.advisory_applications (lower(email));
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
  console.log("✅ advisory_applications table is ready.");
}

main();

export {};

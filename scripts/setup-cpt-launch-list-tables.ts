// One-time: create the CPT launch list tables via the Supabase Management API.
// Run: npx tsx --env-file=.env scripts/setup-cpt-launch-list-tables.ts

const ref = (process.env.SUPABASE_URL || "").match(/https:\/\/([a-z0-9]+)\.supabase\.co/)?.[1];
const token = process.env.SUPABASE_ACCESS_TOKEN;

if (!ref || !token) {
  console.error("Missing SUPABASE_URL or SUPABASE_ACCESS_TOKEN in .env");
  process.exit(1);
}

const sql = `
create table if not exists public.cpt_launch_contacts (
  id uuid primary key default gen_random_uuid(),
  tier text not null check (tier in ('Tier 1','Tier 2','Tier 3','Champion')),
  name text not null,
  how_i_know_them text not null default '',
  channel text not null default '',
  contact text not null default '',
  notes text not null default '',
  added_by text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists cpt_launch_contacts_tier_idx on public.cpt_launch_contacts (tier, created_at);

create table if not exists public.cpt_launch_list_activity (
  id uuid primary key default gen_random_uuid(),
  who text not null default '',
  action text not null,
  detail text not null default '',
  created_at timestamptz not null default now()
);
create index if not exists cpt_launch_list_activity_created_idx on public.cpt_launch_list_activity (created_at desc);
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
  console.log("cpt_launch_contacts + cpt_launch_list_activity are ready.");
}

main();

export {};

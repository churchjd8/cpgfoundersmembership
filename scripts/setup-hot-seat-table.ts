// One-time: create the `hot_seat_applications` table via the Supabase Management API.
// Holds applications from /hot-seat — founders asking to have one business
// challenge worked on by the WhatsApp group for 24 hours.
// Run: npx tsx --env-file=.env scripts/setup-hot-seat-table.ts
const ref = (process.env.SUPABASE_URL || "").match(/https:\/\/([a-z0-9]+)\.supabase\.co/)?.[1];
const token = process.env.SUPABASE_ACCESS_TOKEN;

if (!ref || !token) {
  console.error("Missing SUPABASE_URL or SUPABASE_ACCESS_TOKEN in .env");
  process.exit(1);
}

const sql = `
create table if not exists public.hot_seat_applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  business text not null,
  website text,
  about text not null,              -- a couple of details about the business
  challenge text not null,          -- the biggest challenge right now
  question text not null,           -- the one question they want the group to answer
  in_group text,                    -- "Yes" / "Not yet"
  status text not null default 'new', -- new | selected | later
  created_at timestamptz not null default now()
);
alter table public.hot_seat_applications enable row level security;
create index if not exists hot_seat_applications_created_idx on public.hot_seat_applications (created_at desc);
create index if not exists hot_seat_applications_email_idx on public.hot_seat_applications (lower(email));
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
  console.log("✅ hot_seat_applications table is ready.");
}

main();

export {};

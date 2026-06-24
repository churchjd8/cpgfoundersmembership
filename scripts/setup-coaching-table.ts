// One-time: create the coaching_bookings table via the Supabase Management API.
// Run: npx tsx --env-file=.env scripts/setup-coaching-table.ts

const ref = (process.env.SUPABASE_URL || "").match(/https:\/\/([a-z0-9]+)\.supabase\.co/)?.[1];
const token = process.env.SUPABASE_ACCESS_TOKEN;

if (!ref || !token) {
  console.error("Missing SUPABASE_URL or SUPABASE_ACCESS_TOKEN in .env");
  process.exit(1);
}

const sql = `
create table if not exists public.coaching_bookings (
  id uuid primary key default gen_random_uuid(),
  slot_id text not null unique,
  slot_start timestamptz not null,
  name text not null,
  email text not null,
  phone text not null,
  client_timezone text,
  created_at timestamptz not null default now()
);
`;

async function main() {
  const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
  });

  if (!res.ok) {
    console.error(`Failed (${res.status}):`, await res.text());
    process.exit(1);
  }
  console.log("✅ coaching_bookings table is ready.");
}

main();

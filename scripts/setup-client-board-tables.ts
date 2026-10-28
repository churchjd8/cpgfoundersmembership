// One-time: create the tables behind /clients (Jeff's billing board) via the
// Supabase Management API. Billing status, next charge, and amounts come live
// from Stripe; these tables hold the curated layer (plan, commitment, notes)
// and the hand-maintained prospects list.
// Run: npx tsx --env-file=.env scripts/setup-client-board-tables.ts
const ref = (process.env.SUPABASE_URL || "").match(/https:\/\/([a-z0-9]+)\.supabase\.co/)?.[1];
const token = process.env.SUPABASE_ACCESS_TOKEN;

if (!ref || !token) {
  console.error("Missing SUPABASE_URL or SUPABASE_ACCESS_TOKEN in .env");
  process.exit(1);
}

const sql = `
create table if not exists public.client_board (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  business text not null,
  stripe_customer_id text,            -- null when they aren't billed in Stripe
  plan text not null,                 -- e.g. "VIP 3-Month Intensive"
  monthly_amount numeric not null default 0,
  commitment_start date,              -- first billed month of a minimum term
  commitment_months int,              -- null = monthly, no minimum
  status_override text,               -- 'ended' to retire a row; null = follow Stripe
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
-- Open Stripe invoices we've decided not to chase, so they don't show as owed.
alter table public.client_board add column if not exists ignored_invoice_ids text[] not null default '{}';

create table if not exists public.client_prospects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  business text,
  amount numeric,
  stage text not null default 'Proposal',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
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
  console.log("✅ client_board and client_prospects tables are ready.");
}

main();

export {};

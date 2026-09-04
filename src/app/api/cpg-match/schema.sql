create table if not exists public.cpg_match_submissions (
  id uuid primary key default gen_random_uuid(),
  submission_type text not null check (submission_type in ('waitlist', 'recommendation')),
  first_name text not null,
  last_name text not null,
  email text not null,
  brand text not null,
  vendor_name text,
  vendor_category text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.cpg_match_submissions enable row level security;

create index if not exists cpg_match_submissions_type_created_idx
  on public.cpg_match_submissions (submission_type, created_at desc);

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

-- Private admin workflow, kept separate from the founder's submitted answers.
alter table public.cpg_match_submissions
  add column if not exists crm jsonb not null default '{}'::jsonb,
  add column if not exists crm_version integer not null default 0;

-- Consent is recorded prospectively; never backfill historical approvals.
alter table public.cpg_match_submissions
  add column if not exists review_schema_version integer,
  add column if not exists public_review jsonb,
  add column if not exists approved_at timestamptz,
  add column if not exists verified_at timestamptz,
  add column if not exists publication_status text not null default 'pending'
    check (publication_status in ('pending', 'published'));

-- Vendor-confirmed facts are separate from customer-reported experiences.
create table if not exists public.cpg_match_vendor_intakes (
  id uuid primary key default gen_random_uuid(),
  vendor_name text not null,
  category text not null,
  inquiry_email text not null,
  payload jsonb not null,
  confirmed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  publication_status text not null default 'pending'
    check (publication_status in ('pending', 'published'))
);
alter table public.cpg_match_vendor_intakes enable row level security;

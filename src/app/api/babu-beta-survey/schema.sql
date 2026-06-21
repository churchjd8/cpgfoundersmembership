-- Run this in Supabase SQL editor to create the table for Babu Beta Survey responses.
-- Service role inserts via /api/babu-beta-survey; no client-side reads, so RLS is off.

create table if not exists public.babu_survey_responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- identity
  name text,
  email text not null,
  role text,
  cpg_category text,
  business_stage text,

  -- usage & value
  usage_frequency text,
  workflow text,
  biggest_value text,

  -- satisfaction (1-7, nullable for dormant users who skip the step)
  rating_overall smallint,
  rating_ease smallint,
  rating_ui smallint,
  rating_job_help smallint,

  -- gurus
  gurus_used text,
  discovery_help text,

  -- competing tools
  competing_tools text[] default '{}',

  -- pricing
  would_upgrade text,
  price_point text,

  -- improvement
  what_would_change text,

  -- nps & open
  nps smallint,
  nps_bucket text,
  open_feedback text,

  -- full raw payload for safety
  raw jsonb
);

create index if not exists babu_survey_responses_created_at_idx
  on public.babu_survey_responses (created_at desc);

create index if not exists babu_survey_responses_email_idx
  on public.babu_survey_responses (email);

create index if not exists babu_survey_responses_nps_bucket_idx
  on public.babu_survey_responses (nps_bucket);

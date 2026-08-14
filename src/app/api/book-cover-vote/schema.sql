-- Run this in the Supabase SQL editor to create the table behind
-- cpgfoundersgroup.com/bookcovers (the Cold-Pressed Truth cover poll).
-- Service role writes via /api/book-cover-vote; no client-side reads, so RLS is off.

create table if not exists public.book_cover_votes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Random id generated in the browser and kept in localStorage. One row per
  -- device: re-voting updates the existing row instead of stuffing the ballot.
  voter_id text not null unique,
  choice text not null check (choice in ('A', 'B', 'C')),

  -- Captured on the thank-you step (optional — a vote is valid without them).
  name text,
  email text,
  comment text,

  -- Integrity / debugging. ip_hash is a salted digest, not the raw address.
  ip_hash text,
  user_agent text,
  referrer text
);

create index if not exists book_cover_votes_created_at_idx
  on public.book_cover_votes (created_at desc);

create index if not exists book_cover_votes_choice_idx
  on public.book_cover_votes (choice);

create index if not exists book_cover_votes_email_idx
  on public.book_cover_votes (email);

create index if not exists book_cover_votes_ip_hash_idx
  on public.book_cover_votes (ip_hash);

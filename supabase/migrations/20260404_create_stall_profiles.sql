create extension if not exists pgcrypto;

create table if not exists public.stall_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  slug text not null unique,
  stall_name text not null,
  tagline text,
  about text,
  banner_url text,
  logo_url text,
  video_links jsonb not null default '[]'::jsonb,
  contact_email text,
  instagram_url text,
  linkedin_url text,
  website_url text,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.stall_profiles enable row level security;
-- Create RLS policies. Some Postgres versions (and hosted DB plans)
-- do not support `CREATE POLICY IF NOT EXISTS`. Use DROP+CREATE
-- so the migration works across Supabase/Postgres versions.

drop policy if exists "Public can view published profiles" on public.stall_profiles;
create policy "Public can view published profiles"
on public.stall_profiles
for select
to anon, authenticated
using (is_published = true or auth.uid() = user_id);

drop policy if exists "Users can insert own profile" on public.stall_profiles;
create policy "Users can insert own profile"
on public.stall_profiles
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update own profile" on public.stall_profiles;
create policy "Users can update own profile"
on public.stall_profiles
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_stall_profiles_updated_at on public.stall_profiles;
create trigger trg_stall_profiles_updated_at
before update on public.stall_profiles
for each row
execute function public.set_updated_at();

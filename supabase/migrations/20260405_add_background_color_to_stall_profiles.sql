-- Add background_color column to stall_profiles (safe, idempotent)
alter table if exists public.stall_profiles
  add column if not exists background_color text;

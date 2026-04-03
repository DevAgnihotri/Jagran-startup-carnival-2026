-- Add background_gradient column to stall_profiles (safe, idempotent)
alter table if exists public.stall_profiles
  add column if not exists background_gradient text;

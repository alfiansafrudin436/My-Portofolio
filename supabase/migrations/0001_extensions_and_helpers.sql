-- 0001 — extensions, shared helpers, enums

create extension if not exists "pgcrypto";

-- Shared updated_at trigger, attached to every table below.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Single source of truth for "is the caller the admin?".
-- With one account, authenticated == admin. Keeping it in a function means it
-- can be tightened later (email allowlist, admins table) without touching the
-- 18 policies that call it.
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select auth.role() = 'authenticated';
$$;

create type public.skill_category as enum (
  'language', 'framework', 'library', 'database', 'tool', 'platform', 'design', 'other'
);

create type public.employment_type as enum (
  'full_time', 'part_time', 'contract', 'freelance', 'internship'
);

create type public.proficiency as enum ('beginner', 'intermediate', 'advanced', 'expert');

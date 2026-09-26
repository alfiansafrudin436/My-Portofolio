-- 0002 — profile (singleton) and social links

-- The boolean-unique pair hard-guarantees exactly one row: is_singleton can
-- only ever be true, and true can only appear once.
create table public.profile (
  id              uuid primary key default gen_random_uuid(),
  is_singleton    boolean not null default true,
  full_name       text not null,
  headline        text not null,
  tagline         text,
  bio             text,
  avatar_url      text,
  resume_url      text,
  email           text,
  phone           text,
  location        text,
  available       boolean not null default true,
  available_note  text default 'Available for new opportunities',
  seo_title       text,
  seo_description text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  constraint profile_singleton_uniq unique (is_singleton),
  constraint profile_singleton_true check (is_singleton is true)
);

create trigger profile_set_updated_at
  before update on public.profile
  for each row execute function public.set_updated_at();

create table public.social_links (
  id          uuid primary key default gen_random_uuid(),
  label       text not null,
  url         text not null,
  icon        text not null default 'link',
  is_visible  boolean not null default true,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  constraint social_links_url_format check (url ~* '^(https?://|mailto:|tel:)')
);

create trigger social_links_set_updated_at
  before update on public.social_links
  for each row execute function public.set_updated_at();

create index social_links_visible_order_idx
  on public.social_links (is_visible, sort_order);

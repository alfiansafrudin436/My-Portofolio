-- 0003 — projects

-- tech_stack is text[] rather than a join table: it is display-only metadata
-- (chips under a card) with a single author. A join table would add a second
-- query and a multi-select UI for no analytic benefit. The GIN index keeps
-- "projects using X" fast should that ever be wanted.
create table public.projects (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  slug          text not null unique,
  summary       text,
  description   text,
  cover_url     text,
  gallery_urls  text[] not null default '{}',
  tech_stack    text[] not null default '{}',
  role          text,
  company       text,
  year          smallint,
  github_url    text,
  live_url      text,
  is_featured   boolean not null default false,
  is_published  boolean not null default false,
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  constraint projects_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  constraint projects_year_sane check (year is null or (year between 1990 and 2100))
);

create trigger projects_set_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

create index projects_published_idx on public.projects (is_published, sort_order desc, year desc);
create index projects_featured_idx  on public.projects (is_featured) where is_published;
create index projects_tech_gin_idx  on public.projects using gin (tech_stack);

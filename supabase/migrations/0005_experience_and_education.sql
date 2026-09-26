-- 0005 — experiences and education

-- Two tables rather than one polymorphic table: the fields genuinely differ
-- (employment_type/company vs degree/field_of_study/institution), so a shared
-- table would be half-null in every row.
create table public.experiences (
  id               uuid primary key default gen_random_uuid(),
  company          text not null,
  company_url      text,
  position         text not null,
  employment_type  public.employment_type not null default 'full_time',
  location         text,
  description      text,
  highlights       text[] not null default '{}',
  tech_stack       text[] not null default '{}',
  start_date       date not null,
  end_date         date,
  is_current       boolean not null default false,
  is_visible       boolean not null default true,
  sort_order       integer not null default 0,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  constraint experiences_date_order check (end_date is null or end_date >= start_date),
  constraint experiences_current_null_end check (not is_current or end_date is null)
);

create trigger experiences_set_updated_at
  before update on public.experiences
  for each row execute function public.set_updated_at();

create index experiences_visible_idx on public.experiences (is_visible, start_date desc);

create table public.education (
  id              uuid primary key default gen_random_uuid(),
  institution     text not null,
  institution_url text,
  degree          text not null,
  field_of_study  text,
  location        text,
  grade           text,
  description     text,
  start_date      date not null,
  end_date        date,
  is_current      boolean not null default false,
  is_visible      boolean not null default true,
  sort_order      integer not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  constraint education_date_order check (end_date is null or end_date >= start_date),
  constraint education_current_null_end check (not is_current or end_date is null)
);

create trigger education_set_updated_at
  before update on public.education
  for each row execute function public.set_updated_at();

create index education_visible_idx on public.education (is_visible, start_date desc);

-- 0004 — skills

create table public.skills (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  category     public.skill_category not null default 'other',
  level        public.proficiency,
  icon         text,
  years        numeric(3,1),
  is_featured  boolean not null default false,
  is_visible   boolean not null default true,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  constraint skills_name_uniq unique (name)
);

create trigger skills_set_updated_at
  before update on public.skills
  for each row execute function public.set_updated_at();

create index skills_visible_cat_idx on public.skills (is_visible, category, sort_order);

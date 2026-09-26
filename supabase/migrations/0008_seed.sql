-- 0008 — seed the content that used to be hardcoded in src/app/page.tsx.
-- Idempotent: safe to re-run.

insert into public.profile (
  full_name, headline, tagline, bio, email, location, available, available_note,
  seo_title, seo_description
)
values (
  'Alfian Safrudin',
  'Frontend Engineer',
  'I build fast, scalable interfaces for the web.',
  'I am a Frontend Engineer with over 5 years of professional experience building dynamic, performant, and highly scalable user interfaces. I specialize in modern web architectures, robust state management, and crafting premium user experiences.',
  'alfiansafrudin436@gmail.com',
  'Indonesia',
  true,
  'Available for new opportunities',
  'Alfian Safrudin — Frontend Engineer',
  'Portfolio of Alfian Safrudin, a frontend engineer building performant and scalable web interfaces.'
)
on conflict (is_singleton) do nothing;

insert into public.social_links (label, url, icon, sort_order) values
  ('Email',    'mailto:alfiansafrudin436@gmail.com',        'mail',     1),
  ('LinkedIn', 'https://www.linkedin.com/in/alfian-safrudin/', 'linkedin', 2),
  ('Telegram', 'https://t.me/alfiansafrudin',                'send',     3),
  ('GitHub',   'https://github.com/alfiansafrudin436',       'github',   4)
on conflict do nothing;

insert into public.skills (name, category, level, sort_order, is_featured) values
  ('React.js',     'library',   'expert',       1, true),
  ('Next.js',      'framework', 'expert',       2, true),
  ('TypeScript',   'language',  'advanced',     3, true),
  ('Redux',        'library',   'advanced',     4, false),
  ('Zustand',      'library',   'advanced',     5, false),
  ('GraphQL',      'tool',      'intermediate', 6, false),
  ('Hasura',       'platform',  'intermediate', 7, false),
  ('Supabase',     'platform',  'advanced',     8, true),
  ('Tailwind CSS', 'framework', 'expert',       9, true)
on conflict (name) do nothing;

-- 0006 — row level security
--
-- Read: anonymous visitors see only published/visible rows; the admin also
-- sees drafts, so the master-data tables can reuse the same client.
-- Write: authenticated-only, gated on is_admin(). Policies are written out
-- explicitly rather than generated in a DO block so they can be read and
-- audited one by one in the SQL editor.

alter table public.profile      enable row level security;
alter table public.social_links enable row level security;
alter table public.projects     enable row level security;
alter table public.skills       enable row level security;
alter table public.experiences  enable row level security;
alter table public.education    enable row level security;

-- ---------------- profile ----------------
create policy profile_public_read on public.profile
  for select to anon, authenticated using (true);
create policy profile_admin_insert on public.profile
  for insert to authenticated with check (public.is_admin());
create policy profile_admin_update on public.profile
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
-- No delete policy: the singleton must not be removable.

-- ---------------- social_links ----------------
create policy social_links_public_read on public.social_links
  for select to anon, authenticated using (is_visible or public.is_admin());
create policy social_links_admin_insert on public.social_links
  for insert to authenticated with check (public.is_admin());
create policy social_links_admin_update on public.social_links
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy social_links_admin_delete on public.social_links
  for delete to authenticated using (public.is_admin());

-- ---------------- projects ----------------
create policy projects_public_read on public.projects
  for select to anon, authenticated using (is_published or public.is_admin());
create policy projects_admin_insert on public.projects
  for insert to authenticated with check (public.is_admin());
create policy projects_admin_update on public.projects
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy projects_admin_delete on public.projects
  for delete to authenticated using (public.is_admin());

-- ---------------- skills ----------------
create policy skills_public_read on public.skills
  for select to anon, authenticated using (is_visible or public.is_admin());
create policy skills_admin_insert on public.skills
  for insert to authenticated with check (public.is_admin());
create policy skills_admin_update on public.skills
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy skills_admin_delete on public.skills
  for delete to authenticated using (public.is_admin());

-- ---------------- experiences ----------------
create policy experiences_public_read on public.experiences
  for select to anon, authenticated using (is_visible or public.is_admin());
create policy experiences_admin_insert on public.experiences
  for insert to authenticated with check (public.is_admin());
create policy experiences_admin_update on public.experiences
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy experiences_admin_delete on public.experiences
  for delete to authenticated using (public.is_admin());

-- ---------------- education ----------------
create policy education_public_read on public.education
  for select to anon, authenticated using (is_visible or public.is_admin());
create policy education_admin_insert on public.education
  for insert to authenticated with check (public.is_admin());
create policy education_admin_update on public.education
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy education_admin_delete on public.education
  for delete to authenticated using (public.is_admin());

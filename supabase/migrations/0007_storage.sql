-- 0007 — storage bucket for project covers, galleries and the avatar
--
-- Key convention: projects/<slug>/<uuid>.<ext>, profile/avatar.<ext>,
-- skills/<slug>.<ext>

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portfolio', 'portfolio', true, 5242880,
  array['image/png','image/jpeg','image/webp','image/avif','image/svg+xml']
)
on conflict (id) do nothing;

create policy portfolio_public_read on storage.objects
  for select to anon, authenticated using (bucket_id = 'portfolio');

create policy portfolio_admin_insert on storage.objects
  for insert to authenticated with check (bucket_id = 'portfolio' and public.is_admin());

create policy portfolio_admin_update on storage.objects
  for update to authenticated
  using (bucket_id = 'portfolio' and public.is_admin())
  with check (bucket_id = 'portfolio' and public.is_admin());

create policy portfolio_admin_delete on storage.objects
  for delete to authenticated using (bucket_id = 'portfolio' and public.is_admin());

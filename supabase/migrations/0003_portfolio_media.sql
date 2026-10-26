-- Portfolio stage 3 (CMS) additions:
--   1. portfolio_profile.photo_url   — profile photo, set from the admin CMS
--   2. portfolio_projects.image_url   — project image, set from the admin CMS
--   3. Storage bucket `portfolio-media` (public) for CMS uploads
-- Idempotent: safe to re-run. Same pattern as 0001/0002: RLS on, public
-- read-only access for content; all writes happen through the service role
-- from the server (service role bypasses RLS, so no write policy is —
-- or may be — granted to anon/authenticated here).
--
-- Run order for the whole schema: 0001 → 0002 → 0003 → seed.sql.

begin;

alter table public.portfolio_profile
  add column if not exists photo_url text;

alter table public.portfolio_projects
  add column if not exists image_url text;

-- Public bucket for CMS-uploaded media (profile photo, project images).
insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do nothing;

-- Anyone may READ objects in this bucket (the bucket is public anyway);
-- no INSERT/UPDATE/DELETE policy is created for anon or authenticated,
-- so uploads/replacements/deletes are only possible with the service
-- role key from the server-side CMS routes.
drop policy if exists "portfolio media public read" on storage.objects;
create policy "portfolio media public read" on storage.objects
  for select to public
  using (bucket_id = 'portfolio-media');

commit;

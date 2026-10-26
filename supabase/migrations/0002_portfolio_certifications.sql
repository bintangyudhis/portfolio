-- Portfolio stage 2 additions:
--   1. portfolio_certifications — certificates (Cognitive Class, etc.)
--   2. portfolio_profile.languages — spoken languages + levels (jsonb list)
-- Idempotent: safe to re-run. Same pattern as 0001: RLS on, public
-- read-only SELECT for content, writes only via the owner/service role.

begin;

create table if not exists public.portfolio_certifications (
  id text primary key,
  title text not null,
  issuer text not null,
  issued jsonb not null,
  credential_id text,
  sort int not null default 0
);

alter table public.portfolio_certifications enable row level security;

drop policy if exists "portfolio public read" on public.portfolio_certifications;
create policy "portfolio public read" on public.portfolio_certifications
  for select to anon, authenticated using (true);

alter table public.portfolio_profile
  add column if not exists languages jsonb not null default '[]'::jsonb;

commit;

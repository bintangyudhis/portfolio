-- Portfolio stage 3 additions:
--   portfolio_publications — journal and conference publications, a
--   category of their own (separate from work experience).
-- Idempotent: safe to re-run. Same pattern as 0001/0002: RLS on, public
-- read-only SELECT for content, writes only via the owner/service role.

begin;

create table if not exists public.portfolio_publications (
  id bigint generated always as identity primary key,
  slug text unique not null,
  title text not null,
  venue text not null default '',
  year int,
  url text,
  sort int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.portfolio_publications enable row level security;

drop policy if exists "portfolio public read" on public.portfolio_publications;
create policy "portfolio public read" on public.portfolio_publications
  for select to anon, authenticated using (true);

commit;

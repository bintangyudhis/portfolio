-- Portfolio content tables on the shared Supabase project `dompetku`.
-- Idempotent: safe to re-run. All tables are prefixed portfolio_ and live
-- alongside the DompetKu app's own tables without touching them.
--
-- Translations are stored as jsonb objects: {"id": "...", "en": "...", "jp": "..."}.
-- RLS is enabled with a public read-only policy; writes happen only through
-- the server-side database connection (owner role), never from the browser.

begin;

create table if not exists public.portfolio_profile (
  id int primary key default 1,
  name text not null,
  university text not null,
  email text not null,
  github_url text not null,
  linkedin_url text not null,
  instagram_url text,
  discord_url text,
  role jsonb not null,
  location jsonb not null,
  hero_line jsonb not null,
  intro jsonb not null,
  about jsonb not null,
  focus jsonb not null,
  updated_at timestamptz not null default now(),
  constraint portfolio_profile_singleton check (id = 1)
);

create table if not exists public.portfolio_experiences (
  id text primary key,
  kind text not null check (kind in ('work', 'organization', 'education', 'open-source')),
  org text not null,
  period jsonb not null,
  role jsonb not null,
  description jsonb not null,
  sort int not null default 0
);

create table if not exists public.portfolio_projects (
  id text primary key,
  title text not null,
  year text not null,
  tech text[] not null default '{}',
  description jsonb not null,
  repo_url text,
  live_url text,
  featured boolean not null default false,
  sort int not null default 0
);

create table if not exists public.portfolio_skills (
  id text primary key,
  name jsonb not null,
  blurb jsonb not null,
  skills jsonb not null default '[]',
  sort int not null default 0
);

create table if not exists public.portfolio_messages (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  ip text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- Row Level Security: public read on content tables, nothing public on messages.
alter table public.portfolio_profile enable row level security;
alter table public.portfolio_experiences enable row level security;
alter table public.portfolio_projects enable row level security;
alter table public.portfolio_skills enable row level security;
alter table public.portfolio_messages enable row level security;

drop policy if exists "portfolio public read" on public.portfolio_profile;
create policy "portfolio public read" on public.portfolio_profile
  for select to anon, authenticated using (true);

drop policy if exists "portfolio public read" on public.portfolio_experiences;
create policy "portfolio public read" on public.portfolio_experiences
  for select to anon, authenticated using (true);

drop policy if exists "portfolio public read" on public.portfolio_projects;
create policy "portfolio public read" on public.portfolio_projects
  for select to anon, authenticated using (true);

drop policy if exists "portfolio public read" on public.portfolio_skills;
create policy "portfolio public read" on public.portfolio_skills
  for select to anon, authenticated using (true);

-- portfolio_messages intentionally has no public policy: inserts only via
-- the server-side connection, reads only by the owner.

commit;

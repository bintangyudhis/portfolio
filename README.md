# Portfolio — Bintang Yudhistira

Personal portfolio of Bintang Yudhistira — a single-page editorial site in
three languages (Indonesian / English / Japanese), built with **Next.js 16**,
**Tailwind CSS v4**, and **React 19**. Live at
[bintangyudhis.my.id](https://bintangyudhis.my.id).

Design research, curated data sources, and the redesign report live in
[REDESIGN-NOTES.md](REDESIGN-NOTES.md).

## How it works

- **One page**: hero, about, experience timeline, project index, skills, and
  a contact section with a form (honeypot + time-trap + rate limit anti-spam).
- **Content from Supabase**: profile, experience, projects, and skills are
  stored as `portfolio_*` tables in the shared `dompetku` Supabase project
  and read server-side via `pg` (`src/lib/db.ts`). If the database is
  unreachable, the site renders the identical curated content from
  `src/lib/content.ts` — it never renders empty.
- **Three languages**: the `ID | EN | JP` toggle writes a `pb-lang` cookie
  and re-renders; UI copy lives in `src/lib/i18n.ts`, content translations
  in `src/lib/content.ts` / the database jsonb columns.
- The old multi-page KV CMS (`/admin`) was retired in the October 2026
  redesign; content is now edited in `src/lib/content.ts` + `db:setup`.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000 — no environment needed; the site falls back to
the built-in content.

## Database setup

1. Put the `dompetku` project's `DATABASE_URL` (same value as in the Vercel
   env of dompetku-web / pendekin) into `.env.local` — see `.env.example`.
2. Run:

```bash
npm run db:setup
```

This applies `supabase/migrations/0001_portfolio_tables.sql` (idempotent,
RLS enabled, public read-only) and upserts the curated content.
3. Add the same `DATABASE_URL` to this project's Vercel environment
   variables and redeploy so the live site reads from the database and the
   contact form can store messages in `portfolio_messages`.

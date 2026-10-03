# Portfolio — Bintang Yudhistira

Personal portfolio website built with **Next.js 16**, **Tailwind CSS v4**, and **React 19**.
Live at [bintangyudhis.my.id](https://bintangyudhis.my.id).

## Features

- Modern dark-themed design with animated hero, scroll reveals, and typewriter roles
- Pages: Home, Projects, Experience, Contact
- **Built-in CMS** at `/admin` — add/edit/delete projects & work experience, read contact-form messages (inbox)
- **Contact form with anti-spam**: character limits, honeypot field, time-trap, and rate limiting (5 msgs/hour/IP)
- Data persists via **Vercel KV** (falls back to seed data + in-memory store for local dev)

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000. Admin panel: http://localhost:3000/admin

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Description |
|---|---|
| `ADMIN_PASSWORD` | Password for the `/admin` CMS login (**required**, pick a strong one) |
| `KV_REST_API_URL` | Vercel KV REST URL (auto-filled by Vercel when you add a KV database) |
| `KV_REST_API_TOKEN` | Vercel KV REST token (auto-filled by Vercel) |

Without KV variables the site still works: it shows the built-in seed projects/experience and stores CMS changes in memory (lost on restart).

## Deploy to Vercel

1. Push this repo to GitHub.
2. On [vercel.com](https://vercel.com) → **Add New Project** → import the repo → **Deploy**.
3. **Storage** tab → **Create Database** → **KV** → connect it to the project (this fills `KV_REST_API_URL` / `KV_REST_API_TOKEN` automatically).
4. **Settings → Environment Variables** → add `ADMIN_PASSWORD` (a strong password only you know).
5. Redeploy so the new env var takes effect.

## Connect the custom domain (bintangyudhis.my.id)

1. Vercel project → **Settings → Domains** → add `bintangyudhis.my.id` (and optionally `www.bintangyudhis.my.id`). Vercel will show the required DNS records.
2. In **Cloudflare** (DNS is managed there): add an **A record**:
   - Name: `@`, Content: `76.76.21.21`, Proxy: **DNS only** (grey cloud) for the apex domain — or follow Vercel's exact instructions if they differ.
   - For `www`: add a **CNAME** `www` → `cname.vercel-dns.com`.
3. Wait a few minutes for DNS propagation, then open https://bintangyudhis.my.id. Vercel provisions the SSL certificate automatically.

> Note: the apex A record should be **DNS only** (not proxied) unless Vercel instructs otherwise; `www` CNAME can stay proxied.

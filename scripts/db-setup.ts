// One-shot database setup for the portfolio:
//   1. applies the migrations in supabase/migrations/ (in filename order)
//   2. upserts the curated content from src/lib/content.ts
//
// Usage: DATABASE_URL must be set (read from .env.local when present).
//   npm run db:setup
// The script never prints credential values.

import { readFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "pg";
import { fallbackContent } from "../src/lib/content";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Minimal .env.local loader (avoids an extra dependency).
function loadEnvLocal() {
  const path = join(root, ".env.local");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

async function main() {
  loadEnvLocal();
  const url = process.env.DATABASE_URL;
  if (!url || !url.startsWith("postgres")) {
    console.error(
      "DATABASE_URL is missing or not a Postgres URL. Put the Supabase `dompetku` connection string in .env.local first."
    );
    process.exit(1);
  }

  const client = new Client({
    connectionString: url,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 15000,
  });
  await client.connect();
  console.log("Connected.");

  const migrationsDir = join(root, "supabase/migrations");
  const migrationFiles = readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();
  for (const file of migrationFiles) {
    await client.query(readFileSync(join(migrationsDir, file), "utf8"));
    console.log(`Migration applied: ${file}`);
  }

  const c = fallbackContent;
  const p = c.profile;
  await client.query(
    `insert into public.portfolio_profile
       (id, name, university, email, github_url, linkedin_url, instagram_url, discord_url, role, location, hero_line, intro, about, focus, languages, updated_at)
     values (1, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, now())
     on conflict (id) do update set
       name = excluded.name, university = excluded.university, email = excluded.email,
       github_url = excluded.github_url, linkedin_url = excluded.linkedin_url,
       instagram_url = excluded.instagram_url, discord_url = excluded.discord_url,
       role = excluded.role, location = excluded.location, hero_line = excluded.hero_line,
       intro = excluded.intro, about = excluded.about, focus = excluded.focus,
       languages = excluded.languages,
       updated_at = now()`,
    [
      p.name,
      p.university,
      p.email,
      p.githubUrl,
      p.linkedinUrl,
      p.instagramUrl,
      p.discordUrl,
      JSON.stringify(p.role),
      JSON.stringify(p.location),
      JSON.stringify(p.heroLine),
      JSON.stringify(p.intro),
      JSON.stringify(p.about),
      JSON.stringify(p.focus),
      JSON.stringify(p.languages),
    ]
  );
  console.log("Profile upserted.");

  for (const e of c.experiences) {
    await client.query(
      `insert into public.portfolio_experiences (id, kind, org, period, role, description, sort)
       values ($1, $2, $3, $4, $5, $6, $7)
       on conflict (id) do update set kind = excluded.kind, org = excluded.org,
         period = excluded.period, role = excluded.role,
         description = excluded.description, sort = excluded.sort`,
      [
        e.slug,
        e.kind,
        e.org,
        JSON.stringify(e.period),
        JSON.stringify(e.role),
        JSON.stringify(e.description),
        e.sort,
      ]
    );
  }
  console.log(`Experiences upserted: ${c.experiences.length}`);

  for (const pr of c.projects) {
    await client.query(
      `insert into public.portfolio_projects (id, title, year, tech, description, repo_url, live_url, featured, sort)
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       on conflict (id) do update set title = excluded.title, year = excluded.year,
         tech = excluded.tech, description = excluded.description,
         repo_url = excluded.repo_url, live_url = excluded.live_url,
         featured = excluded.featured, sort = excluded.sort`,
      [
        pr.slug,
        pr.title,
        pr.year,
        pr.tech,
        JSON.stringify(pr.description),
        pr.repoUrl ?? null,
        pr.liveUrl ?? null,
        pr.featured,
        pr.sort,
      ]
    );
  }
  console.log(`Projects upserted: ${c.projects.length}`);

  for (const g of c.skillGroups) {
    await client.query(
      `insert into public.portfolio_skills (id, name, blurb, skills, sort)
       values ($1, $2, $3, $4, $5)
       on conflict (id) do update set name = excluded.name, blurb = excluded.blurb,
         skills = excluded.skills, sort = excluded.sort`,
      [g.slug, JSON.stringify(g.name), JSON.stringify(g.blurb), JSON.stringify(g.skills), g.sort]
    );
  }
  console.log(`Skill groups upserted: ${c.skillGroups.length}`);

  for (const cert of c.certifications) {
    await client.query(
      `insert into public.portfolio_certifications (id, title, issuer, issued, credential_id, sort)
       values ($1, $2, $3, $4, $5, $6)
       on conflict (id) do update set title = excluded.title, issuer = excluded.issuer,
         issued = excluded.issued, credential_id = excluded.credential_id, sort = excluded.sort`,
      [
        cert.slug,
        cert.title,
        cert.issuer,
        JSON.stringify(cert.issued),
        cert.credentialId ?? null,
        cert.sort,
      ]
    );
  }
  console.log(`Certifications upserted: ${c.certifications.length}`);

  await client.end();
  console.log("Done.");
}

main().catch((err) => {
  console.error("db:setup failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});

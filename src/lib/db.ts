// Server-side data layer.
//
// Portfolio content is read from the shared Supabase project `dompetku`
// (tables portfolio_*), in this order:
//   1. PostgREST via @supabase/supabase-js with the public anon key
//      (NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY). The
//      tables carry an RLS policy granting that role read-only access,
//      so no database password is needed anywhere.
//   2. A direct `pg` connection (DATABASE_URL) when configured — kept as
//      an alternative for environments that already carry it.
//   3. `fallbackContent` from ./content.ts — the same curated content, so
//      the site renders identically and never comes up empty.
//
// Contact-form messages are INSERTed with the service-role key
// (SUPABASE_SERVICE_ROLE_KEY, bypasses RLS — portfolio_messages has no
// public policy by design), falling back to the pg connection. When
// neither is configured, insertMessage returns false and the API route
// answers an honest 503.

import { Pool } from "pg";
import {
  fallbackContent,
  type PortfolioContent,
  type ExperienceItem,
  type ProjectItem,
  type SkillGroup,
  type CertificationItem,
  type ProfileContent,
} from "./content";
import { getAnonClient, getServiceClient } from "./supabase";

/* ------------------------------------------------------------------ */
/* Row mapping — pg and PostgREST return the same column shapes.       */
/* ------------------------------------------------------------------ */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>;

function mapProfile(row: Row): ProfileContent {
  return {
    name: row.name,
    role: row.role,
    location: row.location,
    university: row.university,
    heroLine: row.hero_line,
    intro: row.intro,
    about: row.about,
    focus: row.focus,
    // Column added by migration 0002; older databases fall back to the
    // curated list so the field is never missing.
    languages:
      Array.isArray(row.languages) && row.languages.length > 0
        ? row.languages
        : fallbackContent.profile.languages,
    email: row.email,
    // Column email2 arrives with its own migration; until then the
    // curated fallback address is used.
    email2: row.email2 ?? fallbackContent.profile.email2,
    githubUrl: row.github_url,
    linkedinUrl: row.linkedin_url,
    instagramUrl: row.instagram_url ?? undefined,
    discordUrl: row.discord_url ?? undefined,
    // Column added by migration 0003; absent on older databases.
    photoUrl: row.photo_url ?? undefined,
    // Column cv_url arrives with its own migration; absent until then.
    cvUrl: row.cv_url ?? undefined,
  };
}

function mapExperiences(rows: Row[]): ExperienceItem[] {
  return rows.map((r) => ({
    slug: r.id,
    kind: r.kind,
    org: r.org,
    period: r.period,
    role: r.role,
    description: r.description,
    // No tech column in the schema today; tolerate one if it ever appears.
    tech: Array.isArray(r.tech) && r.tech.length > 0 ? r.tech : undefined,
    sort: r.sort,
  }));
}

function mapProjects(rows: Row[]): ProjectItem[] {
  return rows.map((r) => ({
    slug: r.id,
    title: r.title,
    year: r.year,
    tech: r.tech ?? [],
    description: r.description,
    repoUrl: r.repo_url ?? undefined,
    liveUrl: r.live_url ?? undefined,
    // Column added by migration 0003; absent on older databases.
    imageUrl: r.image_url ?? undefined,
    featured: r.featured,
    sort: r.sort,
  }));
}

function mapSkillGroups(rows: Row[]): SkillGroup[] {
  return rows.map((r) => ({
    slug: r.id,
    name: r.name,
    blurb: r.blurb,
    skills: r.skills ?? [],
    sort: r.sort,
  }));
}

function mapCertifications(rows: Row[]): CertificationItem[] {
  return rows.map((r) => ({
    slug: r.id,
    title: r.title,
    issuer: r.issuer,
    issued: r.issued,
    credentialId: r.credential_id ?? undefined,
    sort: r.sort,
  }));
}

function assemble(
  profileRow: Row | null,
  expRows: Row[],
  projRows: Row[],
  skillRows: Row[],
  certRows: Row[]
): PortfolioContent | null {
  if (!profileRow || projRows.length === 0) return null;
  return {
    profile: mapProfile(profileRow),
    experiences: mapExperiences(expRows),
    projects: mapProjects(projRows),
    skillGroups: mapSkillGroups(skillRows),
    certifications: mapCertifications(certRows),
  };
}

/* ------------------------------------------------------------------ */
/* Source 1: Supabase REST (anon key, RLS read-only)                   */
/* ------------------------------------------------------------------ */

async function fetchFromRest(): Promise<PortfolioContent | null> {
  const sb = getAnonClient();
  if (!sb) return null;
  try {
    const [profileRes, expRes, projRes, skillRes] = await Promise.all([
      sb.from("portfolio_profile").select("*").eq("id", 1).maybeSingle(),
      sb.from("portfolio_experiences").select("*").order("sort", { ascending: true }),
      sb.from("portfolio_projects").select("*").order("sort", { ascending: true }),
      sb.from("portfolio_skills").select("*").order("sort", { ascending: true }),
    ]);
    if (profileRes.error || expRes.error || projRes.error || skillRes.error) {
      return null;
    }
    // Certifications live in migration 0002 — best effort: a database that
    // only has 0001 still serves the rest of the content.
    let certRows: Row[] = [];
    const certRes = await sb
      .from("portfolio_certifications")
      .select("*")
      .order("sort", { ascending: true });
    if (!certRes.error && certRes.data) certRows = certRes.data as Row[];

    return assemble(
      profileRes.data as Row | null,
      (expRes.data ?? []) as Row[],
      (projRes.data ?? []) as Row[],
      (skillRes.data ?? []) as Row[],
      certRows
    );
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* Source 2: direct pg connection (DATABASE_URL)                       */
/* ------------------------------------------------------------------ */

let pool: Pool | null = null;

function getPool(): Pool | null {
  const url = process.env.DATABASE_URL;
  if (!url || !url.startsWith("postgres")) return null;
  if (!pool) {
    pool = new Pool({
      connectionString: url,
      ssl: { rejectUnauthorized: false },
      max: 3,
      connectionTimeoutMillis: 8000,
    });
  }
  return pool;
}

async function fetchFromPg(): Promise<PortfolioContent | null> {
  const p = getPool();
  if (!p) return null;
  try {
    const [profileRes, expRes, projRes, skillRes] = await Promise.all([
      p.query("select * from public.portfolio_profile where id = 1"),
      p.query("select * from public.portfolio_experiences order by sort asc"),
      p.query("select * from public.portfolio_projects order by sort asc"),
      p.query("select * from public.portfolio_skills order by sort asc"),
    ]);

    let certRows: Row[] = [];
    try {
      const certRes = await p.query(
        "select * from public.portfolio_certifications order by sort asc"
      );
      certRows = certRes.rows as Row[];
    } catch {
      // Table arrives with migration 0002 — older databases simply have none.
    }

    return assemble(
      (profileRes.rows[0] as Row) ?? null,
      expRes.rows as Row[],
      projRes.rows as Row[],
      skillRes.rows as Row[],
      certRows
    );
  } catch {
    // Table missing / DB unreachable → caller falls back to curated content.
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

// Small in-process cache so a burst of requests doesn't hammer the DB.
let cache: { at: number; data: PortfolioContent | null } | null = null;
const CACHE_MS = 60_000;

/** Drop the in-process content cache (called by the admin CMS after a write). */
export function invalidateContentCache(): void {
  cache = null;
}

/**
 * The CV file URL lives in its own column (cv_url) that is being added by
 * a separate migration. It is fetched in its own tolerant query so a
 * database without the column yet simply behaves as "no CV uploaded":
 * every failure path returns undefined instead of breaking the page.
 */
async function fetchCvUrl(): Promise<string | undefined> {
  const sb = getAnonClient();
  if (sb) {
    try {
      const { data, error } = await sb
        .from("portfolio_profile")
        .select("cv_url")
        .eq("id", 1)
        .maybeSingle();
      const value = (data as Row | null)?.cv_url;
      if (!error && typeof value === "string" && value) return value;
    } catch {
      // Column not there yet: no CV.
    }
  }
  const p = getPool();
  if (p) {
    try {
      const res = await p.query(
        "select cv_url from public.portfolio_profile where id = 1"
      );
      const value = (res.rows[0] as Row | undefined)?.cv_url;
      if (typeof value === "string" && value) return value;
    } catch {
      // Column not there yet: no CV.
    }
  }
  return undefined;
}

export async function getPortfolioContent(): Promise<PortfolioContent> {
  if (cache && Date.now() - cache.at < CACHE_MS) {
    return cache.data ?? fallbackContent;
  }
  const data = (await fetchFromRest()) ?? (await fetchFromPg());
  const cvUrl = await fetchCvUrl();
  if (data) {
    if (cvUrl) data.profile.cvUrl = cvUrl;
    cache = { at: Date.now(), data };
    return data;
  }
  cache = { at: Date.now(), data };
  // Never mutate the shared fallback object when attaching the CV URL.
  return cvUrl
    ? { ...fallbackContent, profile: { ...fallbackContent.profile, cvUrl } }
    : fallbackContent;
}

export interface StoredMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  ip: string;
}

/**
 * Insert a contact-form message. Prefers the service-role key (RLS
 * bypass); falls back to the pg connection. Returns false when message
 * storage is not configured at all — the route then answers 503.
 */
export async function insertMessage(m: StoredMessage): Promise<boolean> {
  const sb = getServiceClient();
  if (sb) {
    try {
      const { error } = await sb.from("portfolio_messages").insert({
        name: m.name,
        email: m.email,
        subject: m.subject,
        message: m.message,
        ip: m.ip,
      });
      if (!error) return true;
    } catch {
      // Fall through to the pg connection.
    }
  }

  const p = getPool();
  if (!p) return false;
  try {
    await p.query(
      "insert into public.portfolio_messages (name, email, subject, message, ip) values ($1, $2, $3, $4, $5)",
      [m.name, m.email, m.subject, m.message, m.ip]
    );
    return true;
  } catch {
    return false;
  }
}

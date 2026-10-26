// Admin CMS data access — server-side only.
//
// All reads and writes go through the Supabase service-role client
// (SUPABASE_SERVICE_ROLE_KEY, bypasses RLS). portfolio_messages has no
// public policy and the content tables are read-only for the public, so
// this client is the only write path — exactly what a CMS needs. When the
// service client is not configured the routes answer an honest 503
// ("database belum terhubung") instead of pretending to save.

import type { SupabaseClient } from "@supabase/supabase-js";
import { getServiceClient } from "./supabase";
import type {
  CertificationItem,
  ExperienceItem,
  ProfileContent,
  ProjectItem,
  SkillGroup,
} from "./content";

export const DB_OFF_ERROR =
  "Database belum terhubung. Pasang NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY untuk mengaktifkan CMS.";

export function getAdminClient(): SupabaseClient | null {
  return getServiceClient();
}

/* ------------------------------------------------------------------ */
/* Row mapping (DB columns → content types, incl. migration 0003)      */
/* ------------------------------------------------------------------ */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>;

export function rowToProfile(r: Row): ProfileContent {
  return {
    name: r.name,
    role: r.role,
    location: r.location,
    university: r.university,
    heroLine: r.hero_line,
    intro: r.intro,
    about: r.about,
    focus: r.focus ?? [],
    languages: r.languages ?? [],
    email: r.email,
    email2: r.email2 ?? undefined,
    githubUrl: r.github_url,
    linkedinUrl: r.linkedin_url,
    instagramUrl: r.instagram_url ?? "",
    discordUrl: r.discord_url ?? "",
    photoUrl: r.photo_url ?? undefined,
    cvUrl: r.cv_url ?? undefined,
  };
}

export function profileToRow(p: ProfileContent): Row {
  return {
    id: 1,
    name: p.name,
    university: p.university,
    email: p.email,
    email2: p.email2 ?? null,
    github_url: p.githubUrl,
    linkedin_url: p.linkedinUrl,
    instagram_url: p.instagramUrl || null,
    discord_url: p.discordUrl || null,
    role: p.role,
    location: p.location,
    hero_line: p.heroLine,
    intro: p.intro,
    about: p.about,
    focus: p.focus,
    languages: p.languages,
    photo_url: p.photoUrl ?? null,
    cv_url: p.cvUrl ?? null,
    updated_at: new Date().toISOString(),
  };
}

export function rowToExperience(r: Row): ExperienceItem {
  return {
    slug: r.id,
    kind: r.kind,
    org: r.org,
    period: r.period,
    role: r.role,
    description: r.description,
    sort: r.sort,
  };
}

export function experienceToRow(e: ExperienceItem): Row {
  return {
    id: e.slug,
    kind: e.kind,
    org: e.org,
    period: e.period,
    role: e.role,
    description: e.description,
    sort: e.sort,
  };
}

export function rowToProject(r: Row): ProjectItem {
  return {
    slug: r.id,
    title: r.title,
    year: r.year,
    tech: r.tech ?? [],
    description: r.description,
    repoUrl: r.repo_url ?? undefined,
    liveUrl: r.live_url ?? undefined,
    imageUrl: r.image_url ?? undefined,
    featured: r.featured,
    sort: r.sort,
  };
}

export function projectToRow(p: ProjectItem): Row {
  return {
    id: p.slug,
    title: p.title,
    year: p.year,
    tech: p.tech,
    description: p.description,
    repo_url: p.repoUrl ?? null,
    live_url: p.liveUrl ?? null,
    image_url: p.imageUrl ?? null,
    featured: p.featured,
    sort: p.sort,
  };
}

export function rowToSkillGroup(r: Row): SkillGroup {
  return {
    slug: r.id,
    name: r.name,
    blurb: r.blurb,
    skills: r.skills ?? [],
    sort: r.sort,
  };
}

export function skillGroupToRow(g: SkillGroup): Row {
  return { id: g.slug, name: g.name, blurb: g.blurb, skills: g.skills, sort: g.sort };
}

export function rowToCertification(r: Row): CertificationItem {
  return {
    slug: r.id,
    title: r.title,
    issuer: r.issuer,
    issued: r.issued,
    credentialId: r.credential_id ?? undefined,
    sort: r.sort,
  };
}

export function certificationToRow(c: CertificationItem): Row {
  return {
    id: c.slug,
    title: c.title,
    issuer: c.issuer,
    issued: c.issued,
    credential_id: c.credentialId ?? null,
    sort: c.sort,
  };
}

export interface AdminMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  ip: string | null;
  isRead: boolean;
  createdAt: string;
}

export function rowToMessage(r: Row): AdminMessage {
  return {
    id: r.id,
    name: r.name,
    email: r.email,
    subject: r.subject,
    message: r.message,
    ip: r.ip ?? null,
    isRead: r.is_read,
    createdAt: r.created_at,
  };
}

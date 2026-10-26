// Parsers turning admin request bodies into content items (or null).
// Used by the /api/admin/* CRUD routes; `slugOverride` pins the id on
// updates so a slug can never be renamed through a PUT body.

import {
  EXPERIENCE_KINDS,
  SLUG_RE,
  isObj,
  optString,
  parseLocalized,
  parseSkills,
  parseSort,
  parseTech,
  reqString,
} from "./admin-validate";
import type {
  CertificationItem,
  ExperienceItem,
  ProjectItem,
  PublicationItem,
  SkillGroup,
} from "./content";

function parseSlug(body: Record<string, unknown>, override?: string): string | null {
  const raw = override ?? body.slug;
  const s = reqString(raw, 80);
  return s && SLUG_RE.test(s) ? s : null;
}

export function parseExperience(body: unknown, slugOverride?: string): ExperienceItem | null {
  if (!isObj(body)) return null;
  const slug = parseSlug(body, slugOverride);
  const org = reqString(body.org, 200);
  const period = parseLocalized(body.period, 300);
  const role = parseLocalized(body.role, 300);
  const description = parseLocalized(body.description, 4000);
  const sort = parseSort(body.sort) ?? 0;
  if (!slug || !org || !period || !role || !description) return null;
  if (!EXPERIENCE_KINDS.includes(body.kind as ExperienceItem["kind"])) return null;
  return { slug, kind: body.kind as ExperienceItem["kind"], org, period, role, description, sort };
}

export function parseProject(body: unknown, slugOverride?: string): ProjectItem | null {
  if (!isObj(body)) return null;
  const slug = parseSlug(body, slugOverride);
  const title = reqString(body.title, 200);
  const year = reqString(body.year, 20);
  const tech = parseTech(body.tech);
  const description = parseLocalized(body.description, 4000);
  const sort = parseSort(body.sort) ?? 0;
  if (!slug || !title || !year || !tech || !description) return null;
  return {
    slug,
    title,
    year,
    tech,
    description,
    repoUrl: optString(body.repoUrl, 500) ?? undefined,
    liveUrl: optString(body.liveUrl, 500) ?? undefined,
    imageUrl: optString(body.imageUrl, 1000) ?? undefined,
    featured: body.featured === true,
    sort,
  };
}

export function parseSkillGroup(body: unknown, slugOverride?: string): SkillGroup | null {
  if (!isObj(body)) return null;
  const slug = parseSlug(body, slugOverride);
  const name = parseLocalized(body.name, 200);
  const blurb = parseLocalized(body.blurb, 2000);
  const skills = parseSkills(body.skills);
  const sort = parseSort(body.sort) ?? 0;
  if (!slug || !name || !blurb || !skills) return null;
  return { slug, name, blurb, skills, sort };
}

export function parsePublication(body: unknown, slugOverride?: string): PublicationItem | null {
  if (!isObj(body)) return null;
  const slug = parseSlug(body, slugOverride);
  const title = reqString(body.title, 500);
  const sort = parseSort(body.sort) ?? 0;
  if (!slug || !title) return null;
  // Venue and year are optional: a publication can be listed before its
  // venue line is final (venue then stays an empty string, as seeded).
  const year = parseSort(body.year);
  return {
    slug,
    title,
    venue: optString(body.venue, 300) ?? "",
    year: year === null ? undefined : year,
    url: optString(body.url, 1000) ?? undefined,
    sort,
  };
}

export function parseCertification(body: unknown, slugOverride?: string): CertificationItem | null {
  if (!isObj(body)) return null;
  const slug = parseSlug(body, slugOverride);
  const title = reqString(body.title, 200);
  const issuer = reqString(body.issuer, 200);
  const issued = parseLocalized(body.issued, 200);
  const sort = parseSort(body.sort) ?? 0;
  if (!slug || !title || !issuer || !issued) return null;
  return {
    slug,
    title,
    issuer,
    issued,
    credentialId: optString(body.credentialId, 200) ?? undefined,
    sort,
  };
}

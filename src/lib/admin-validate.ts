// Input validation for admin CMS payloads. Every parser returns null on
// invalid input so route handlers can answer a uniform 400.

import type { Localized } from "./i18n";
import type { ExperienceKind, FocusArea, LanguageItem, SkillLevel } from "./content";

const LOCALES = ["id", "en", "jp"] as const;
export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const EXPERIENCE_KINDS: ExperienceKind[] = [
  "work",
  "organization",
  "education",
  "open-source",
];
export const SKILL_LEVELS: SkillLevel[] = ["advanced", "proficient", "exploring"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Obj = Record<string, any>;

export function isObj(v: unknown): v is Obj {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function reqString(v: unknown, max = 500): string | null {
  if (typeof v !== "string") return null;
  const s = v.trim();
  return s.length > 0 && s.length <= max ? s : null;
}

export function optString(v: unknown, max = 1000): string | null {
  if (v === undefined || v === null || v === "") return null;
  if (typeof v !== "string") return null;
  const s = v.trim();
  return s.length <= max ? s || null : null;
}

export function parseSort(v: unknown): number | null {
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : NaN;
  return Number.isFinite(n) ? Math.trunc(n) : null;
}

export function parseLocalized(v: unknown, max = 4000): Localized | null {
  if (!isObj(v)) return null;
  const out = {} as Localized;
  for (const loc of LOCALES) {
    const s = v[loc];
    if (typeof s !== "string" || s.length > max) return null;
    out[loc] = s;
  }
  return out;
}

/** about field: { id: string[], en: string[], jp: string[] } */
export function parseParagraphs(v: unknown): Record<"id" | "en" | "jp", string[]> | null {
  if (!isObj(v)) return null;
  const out = {} as Record<"id" | "en" | "jp", string[]>;
  for (const loc of LOCALES) {
    const arr = v[loc];
    if (!Array.isArray(arr)) return null;
    const paras: string[] = [];
    for (const p of arr) {
      if (typeof p !== "string" || p.length > 8000) return null;
      if (p.trim().length > 0) paras.push(p.trim());
    }
    out[loc] = paras;
  }
  return out;
}

export function parseFocus(v: unknown): FocusArea[] | null {
  if (!Array.isArray(v) || v.length > 12) return null;
  const out: FocusArea[] = [];
  for (const item of v) {
    if (!isObj(item)) return null;
    const title = parseLocalized(item.title, 200);
    const description = parseLocalized(item.description, 2000);
    if (!title || !description) return null;
    out.push({ title, description });
  }
  return out;
}

export function parseLanguages(v: unknown): LanguageItem[] | null {
  if (!Array.isArray(v) || v.length > 12) return null;
  const out: LanguageItem[] = [];
  for (const item of v) {
    if (!isObj(item)) return null;
    const name = parseLocalized(item.name, 200);
    const level = parseLocalized(item.level, 200);
    if (!name || !level) return null;
    out.push({ name, level });
  }
  return out;
}

export function parseSkills(v: unknown): { name: string; level: SkillLevel }[] | null {
  if (!Array.isArray(v) || v.length > 30) return null;
  const out: { name: string; level: SkillLevel }[] = [];
  for (const item of v) {
    if (!isObj(item)) return null;
    const name = reqString(item.name, 120);
    if (!name || !SKILL_LEVELS.includes(item.level)) return null;
    out.push({ name, level: item.level as SkillLevel });
  }
  return out;
}

export function parseTech(v: unknown): string[] | null {
  if (!Array.isArray(v) || v.length > 20) return null;
  const out: string[] = [];
  for (const t of v) {
    const s = reqString(t, 60);
    if (!s) return null;
    out.push(s);
  }
  return out;
}

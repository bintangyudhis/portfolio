import { kv } from "@vercel/kv";
import { seedExperience, seedProjects } from "./seed";
import { ContactMessage, Experience, Project } from "./types";

// ---------------------------------------------------------------------------
// Storage abstraction: Vercel KV when configured, in-memory fallback otherwise.
// The in-memory fallback is only for local development — on Vercel the user
// must create a KV database (see README) for the CMS to persist.
// ---------------------------------------------------------------------------

const mem = new Map<string, unknown>();

function kvConfigured(): boolean {
  return Boolean(
    process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
  );
}

async function get<T>(key: string): Promise<T | null> {
  if (kvConfigured()) {
    try {
      return (await kv.get<T>(key)) ?? null;
    } catch {
      return (mem.get(key) as T) ?? null;
    }
  }
  return (mem.get(key) as T) ?? null;
}

async function set(key: string, value: unknown): Promise<void> {
  if (kvConfigured()) {
    try {
      await kv.set(key, value);
      return;
    } catch {
      // fall through to memory
    }
  }
  mem.set(key, value);
}

const K = {
  projects: "portfolio:projects",
  experience: "portfolio:experience",
  messages: "portfolio:messages",
  session: (t: string) => `portfolio:session:${t}`,
  ratelimit: (ip: string) => `portfolio:ratelimit:${ip}`,
};

const byCreatedDesc = <T extends { createdAt: number }>(a: T, b: T) =>
  b.createdAt - a.createdAt;

// --- Projects ---------------------------------------------------------------
export async function getProjects(): Promise<Project[]> {
  const stored = await get<Project[]>(K.projects);
  if (stored && stored.length > 0) return [...stored].sort(byCreatedDesc);
  return seedProjects;
}

export async function saveProjects(list: Project[]): Promise<void> {
  await set(K.projects, list);
}

// --- Experience -------------------------------------------------------------
export async function getExperience(): Promise<Experience[]> {
  const stored = await get<Experience[]>(K.experience);
  if (stored && stored.length > 0) return [...stored].sort(byCreatedDesc);
  return seedExperience;
}

export async function saveExperience(list: Experience[]): Promise<void> {
  await set(K.experience, list);
}

// --- Contact messages -------------------------------------------------------
export async function getMessages(): Promise<ContactMessage[]> {
  const stored = await get<ContactMessage[]>(K.messages);
  return stored ? [...stored].sort(byCreatedDesc) : [];
}

export async function addMessage(m: ContactMessage): Promise<void> {
  const list = await getMessages();
  list.push(m);
  // keep the inbox bounded
  await set(K.messages, list.slice(-500));
}

export async function saveMessages(list: ContactMessage[]): Promise<void> {
  await set(K.messages, list);
}

// --- Admin sessions ---------------------------------------------------------
export async function createSession(token: string): Promise<void> {
  // 7 days
  if (kvConfigured()) {
    try {
      await kv.set(K.session(token), "1", { ex: 60 * 60 * 24 * 7 });
      return;
    } catch {
      // fall through
    }
  }
  mem.set(K.session(token), Date.now() + 7 * 24 * 60 * 60 * 1000);
}

export async function validSession(token: string): Promise<boolean> {
  if (kvConfigured()) {
    try {
      return (await kv.get(K.session(token))) === "1";
    } catch {
      // fall through
    }
  }
  const exp = mem.get(K.session(token)) as number | undefined;
  return typeof exp === "number" && exp > Date.now();
}

export async function deleteSession(token: string): Promise<void> {
  if (kvConfigured()) {
    try {
      await kv.del(K.session(token));
    } catch {
      // ignore
    }
  }
  mem.delete(K.session(token));
}

// --- Rate limiting (contact form) -------------------------------------------
export async function checkRateLimit(
  ip: string,
  max: number,
  windowSec: number
): Promise<{ allowed: boolean; remaining: number }> {
  const key = K.ratelimit(ip);
  if (kvConfigured()) {
    try {
      const count = await kv.incr(key);
      if (count === 1) await kv.expire(key, windowSec);
      return { allowed: count <= max, remaining: Math.max(0, max - count) };
    } catch {
      // fall through to memory
    }
  }
  const now = Date.now();
  const rec = mem.get(key) as { count: number; reset: number } | undefined;
  if (!rec || rec.reset < now) {
    mem.set(key, { count: 1, reset: now + windowSec * 1000 });
    return { allowed: true, remaining: max - 1 };
  }
  rec.count += 1;
  return { allowed: rec.count <= max, remaining: Math.max(0, max - rec.count) };
}

export function newId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

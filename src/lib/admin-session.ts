// Admin session tokens — pure helpers (no Next.js imports) so they can be
// used from the proxy as well as from route handlers and server components.
//
// Model: a single owner password (env ADMIN_PASSWORD) is exchanged at login
// for a signed cookie. The cookie carries only an expiry; the signature is
// HMAC-SHA256 over the payload with a server secret (env
// ADMIN_SESSION_SECRET, falling back to ADMIN_PASSWORD itself). Nothing
// about the password is stored in the cookie.

import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "pb-admin-session";
export const SESSION_MAX_AGE_S = 60 * 60 * 24 * 7; // 7 days

export function adminLoginConfigured(): boolean {
  return typeof process.env.ADMIN_PASSWORD === "string" && process.env.ADMIN_PASSWORD.length > 0;
}

function sessionSecret(): string | null {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || null;
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createSessionToken(now: number = Date.now()): string | null {
  const secret = sessionSecret();
  if (!secret) return null;
  const exp = Math.floor(now / 1000) + SESSION_MAX_AGE_S;
  const payload = `v1.${exp}`;
  return `${payload}.${sign(payload, secret)}`;
}

export function verifySessionToken(
  token: string | undefined | null,
  now: number = Date.now()
): boolean {
  if (!token) return false;
  const secret = sessionSecret();
  if (!secret) return false;
  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== "v1") return false;
  const exp = Number(parts[1]);
  if (!Number.isFinite(exp) || exp * 1000 <= now) return false;
  const expected = sign(`v1.${parts[1]}`, secret);
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(parts[2], "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Timing-safe password check (compares SHA-256 digests, never raw strings). */
export function adminPasswordMatches(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_MAX_AGE_S,
  secure: process.env.NODE_ENV === "production",
};

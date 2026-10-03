import { cookies } from "next/headers";
import { deleteSession, validSession } from "./store";

export const SESSION_COOKIE = "portfolio_admin_session";

export async function isAdmin(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  return validSession(token);
}

export async function adminToken(): Promise<string | null> {
  const jar = await cookies();
  return jar.get(SESSION_COOKIE)?.value ?? null;
}

export async function clearAdminSession(): Promise<void> {
  const token = await adminToken();
  if (token) await deleteSession(token);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected) return false;
  return timingSafeEqual(input, expected);
}

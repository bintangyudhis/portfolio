// Server-side admin guards for pages and API routes. The proxy performs the
// same check earlier in the pipeline; these helpers are the second layer so
// no page or route is ever reachable by accident if the matcher changes.

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, verifySessionToken } from "./admin-session";

export async function isAdmin(): Promise<boolean> {
  const jar = await cookies();
  return verifySessionToken(jar.get(ADMIN_COOKIE)?.value);
}

/** For admin pages: bounce to the login page when there is no valid session. */
export async function requireAdminPage(): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");
}

/** For admin API routes: returns a 401 response, or null when authorized. */
export async function adminApiGuard(): Promise<NextResponse | null> {
  if (await isAdmin()) return null;
  return NextResponse.json({ error: "Tidak terautentikasi." }, { status: 401 });
}

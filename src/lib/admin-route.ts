// Shared plumbing for /api/admin/* route handlers: auth guard + service
// client in one call, uniform error responses, and cache invalidation
// after writes so the public page picks changes up immediately.

import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import type { SupabaseClient } from "@supabase/supabase-js";
import { adminApiGuard } from "./admin-guard";
import { DB_OFF_ERROR, getAdminClient } from "./admin-db";
import { invalidateContentCache } from "./db";

export async function adminDb(): Promise<
  { sb: SupabaseClient; error?: never } | { sb?: never; error: NextResponse }
> {
  const denied = await adminApiGuard();
  if (denied) return { error: denied };
  const sb = getAdminClient();
  if (!sb) {
    return { error: NextResponse.json({ error: DB_OFF_ERROR }, { status: 503 }) };
  }
  return { sb };
}

export function afterWrite(): void {
  invalidateContentCache();
  revalidatePath("/");
}

export function badRequest(message: string): NextResponse {
  return NextResponse.json({ error: message }, { status: 400 });
}

export function dbError(message?: string): NextResponse {
  return NextResponse.json(
    { error: message ? `Operasi database gagal: ${message}` : "Operasi database gagal." },
    { status: 500 }
  );
}

export function conflict(message: string): NextResponse {
  return NextResponse.json({ error: message }, { status: 409 });
}

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { clearAdminSession, SESSION_COOKIE } from "@/lib/auth";

export async function POST() {
  await clearAdminSession();
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  return NextResponse.json({ ok: true });
}

import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminLoginConfigured,
  adminPasswordMatches,
  createSessionToken,
  sessionCookieOptions,
} from "@/lib/admin-session";

export async function POST(req: NextRequest) {
  if (!adminLoginConfigured()) {
    return NextResponse.json(
      { error: "Login admin belum dikonfigurasi (env ADMIN_PASSWORD belum dipasang)." },
      { status: 503 }
    );
  }
  const body = await req.json().catch(() => null);
  const password =
    body && typeof body === "object" ? (body as Record<string, unknown>).password : undefined;
  if (typeof password !== "string" || !adminPasswordMatches(password)) {
    return NextResponse.json({ error: "Kata sandi salah." }, { status: 401 });
  }
  const token = createSessionToken();
  if (!token) {
    return NextResponse.json({ error: "Sesi tidak dapat dibuat." }, { status: 500 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, sessionCookieOptions);
  return res;
}

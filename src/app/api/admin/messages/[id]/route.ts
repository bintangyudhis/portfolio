import { NextRequest, NextResponse } from "next/server";
import { adminDb, badRequest, dbError } from "@/lib/admin-route";

function parseId(raw: string): number | null {
  const n = Number(raw);
  return Number.isInteger(n) && n > 0 ? n : null;
}

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { sb, error } = await adminDb();
  if (error) return error;
  const id = parseId((await ctx.params).id);
  if (id === null) return badRequest("ID pesan tidak valid.");
  const body = await req.json().catch(() => null);
  const isRead =
    body && typeof body === "object" ? (body as Record<string, unknown>).isRead : undefined;
  if (typeof isRead !== "boolean") return badRequest("Field isRead (boolean) wajib diisi.");
  const { data, error: qError } = await sb
    .from("portfolio_messages")
    .update({ is_read: isRead })
    .eq("id", id)
    .select("id");
  if (qError) return dbError(qError.message);
  if (!data || data.length === 0) {
    return NextResponse.json({ error: "Pesan tidak ditemukan." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { sb, error } = await adminDb();
  if (error) return error;
  const id = parseId((await ctx.params).id);
  if (id === null) return badRequest("ID pesan tidak valid.");
  const { data, error: qError } = await sb
    .from("portfolio_messages")
    .delete()
    .eq("id", id)
    .select("id");
  if (qError) return dbError(qError.message);
  if (!data || data.length === 0) {
    return NextResponse.json({ error: "Pesan tidak ditemukan." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}

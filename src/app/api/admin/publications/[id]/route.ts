// Item handlers for publications. These mirror makeItemHandlers (the
// factory behind the other collections) with one difference: the
// portfolio_publications table (migration 0004) has a bigint identity
// `id` of its own, so updates and deletes key on the `slug` column —
// the [id] route parameter carries the slug, exactly like the other
// collections' routes look to the admin UI.

import { NextRequest, NextResponse } from "next/server";
import { adminDb, afterWrite, badRequest, dbError } from "@/lib/admin-route";
import { publicationToRow } from "@/lib/admin-db";
import { parsePublication } from "@/lib/admin-payloads";

const INVALID_MESSAGE = "Data publikasi tidak valid — slug dan judul wajib diisi.";

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { sb, error } = await adminDb();
  if (error) return error;
  const { id } = await ctx.params;
  const body = await req.json().catch(() => null);
  const item = parsePublication(body, id);
  if (!item) return badRequest(INVALID_MESSAGE);
  const row = publicationToRow(item);
  const { data, error: qError } = await sb
    .from("portfolio_publications")
    .update(row)
    .eq("slug", id)
    .select("slug");
  if (qError) return dbError(qError.message);
  if (!data || data.length === 0) {
    return NextResponse.json({ error: "Publikasi tidak ditemukan." }, { status: 404 });
  }
  afterWrite();
  return NextResponse.json({ ok: true, item });
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { sb, error } = await adminDb();
  if (error) return error;
  const { id } = await ctx.params;
  const { data, error: qError } = await sb
    .from("portfolio_publications")
    .delete()
    .eq("slug", id)
    .select("slug");
  if (qError) return dbError(qError.message);
  if (!data || data.length === 0) {
    return NextResponse.json({ error: "Publikasi tidak ditemukan." }, { status: 404 });
  }
  afterWrite();
  return NextResponse.json({ ok: true });
}

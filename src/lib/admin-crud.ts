// Generic CRUD handlers for the admin CMS collections (experiences,
// projects, skills, certifications all share the same shape: a slug-keyed
// row with a `sort` column). Route files wire a table + parser + mappers
// into these factories.

import { NextRequest, NextResponse } from "next/server";
import { adminDb, afterWrite, badRequest, conflict, dbError } from "./admin-route";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>;

export interface CrudConfig<T> {
  table: string;
  label: string;
  parse: (body: unknown, slugOverride?: string) => T | null;
  toRow: (item: T) => Row;
  toItem: (row: Row) => T;
  invalidMessage: string;
}

export function makeCollectionHandlers<T>(cfg: CrudConfig<T>) {
  async function GET() {
    const { sb, error } = await adminDb();
    if (error) return error;
    const { data, error: qError } = await sb
      .from(cfg.table)
      .select("*")
      .order("sort", { ascending: true });
    if (qError) return dbError(qError.message);
    return NextResponse.json({ items: (data as Row[]).map(cfg.toItem) });
  }

  async function POST(req: NextRequest) {
    const { sb, error } = await adminDb();
    if (error) return error;
    const body = await req.json().catch(() => null);
    const item = cfg.parse(body);
    if (!item) return badRequest(cfg.invalidMessage);
    const { error: qError } = await sb.from(cfg.table).insert(cfg.toRow(item));
    if (qError) {
      if (qError.code === "23505") {
        return conflict(`${cfg.label} dengan slug tersebut sudah ada.`);
      }
      return dbError(qError.message);
    }
    afterWrite();
    return NextResponse.json({ ok: true, item }, { status: 201 });
  }

  return { GET, POST };
}

export function makeItemHandlers<T>(cfg: CrudConfig<T>) {
  async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    const { sb, error } = await adminDb();
    if (error) return error;
    const { id } = await ctx.params;
    const body = await req.json().catch(() => null);
    const item = cfg.parse(body, id);
    if (!item) return badRequest(cfg.invalidMessage);
    const row = cfg.toRow(item);
    delete row.id;
    const { data, error: qError } = await sb
      .from(cfg.table)
      .update(row)
      .eq("id", id)
      .select("id");
    if (qError) return dbError(qError.message);
    if (!data || data.length === 0) {
      return NextResponse.json({ error: `${cfg.label} tidak ditemukan.` }, { status: 404 });
    }
    afterWrite();
    return NextResponse.json({ ok: true, item });
  }

  async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
    const { sb, error } = await adminDb();
    if (error) return error;
    const { id } = await ctx.params;
    const { data, error: qError } = await sb
      .from(cfg.table)
      .delete()
      .eq("id", id)
      .select("id");
    if (qError) return dbError(qError.message);
    if (!data || data.length === 0) {
      return NextResponse.json({ error: `${cfg.label} tidak ditemukan.` }, { status: 404 });
    }
    afterWrite();
    return NextResponse.json({ ok: true });
  }

  return { PUT, DELETE };
}

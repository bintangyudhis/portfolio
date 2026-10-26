import { NextResponse } from "next/server";
import { adminDb, dbError } from "@/lib/admin-route";
import { rowToMessage } from "@/lib/admin-db";

export async function GET() {
  const { sb, error } = await adminDb();
  if (error) return error;
  const { data, error: qError } = await sb
    .from("portfolio_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);
  if (qError) return dbError(qError.message);
  return NextResponse.json({ items: (data ?? []).map(rowToMessage) });
}

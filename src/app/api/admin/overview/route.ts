import { NextResponse } from "next/server";
import { adminDb } from "@/lib/admin-route";

export async function GET() {
  const { sb, error } = await adminDb();
  if (error) return error;

  const tables = [
    "portfolio_experiences",
    "portfolio_projects",
    "portfolio_skills",
    "portfolio_certifications",
    "portfolio_messages",
  ] as const;

  const counts: Record<string, number> = {};
  for (const table of tables) {
    const { count, error: qError } = await sb
      .from(table)
      .select("*", { count: "exact", head: true });
    if (qError) {
      return NextResponse.json(
        { error: `Gagal membaca tabel ${table}: ${qError.message}` },
        { status: 500 }
      );
    }
    counts[table] = count ?? 0;
  }

  const { count: unread } = await sb
    .from("portfolio_messages")
    .select("*", { count: "exact", head: true })
    .eq("is_read", false);

  return NextResponse.json({
    dbConnected: true,
    counts: {
      experiences: counts.portfolio_experiences,
      projects: counts.portfolio_projects,
      skillGroups: counts.portfolio_skills,
      certifications: counts.portfolio_certifications,
      messages: counts.portfolio_messages,
      unreadMessages: unread ?? 0,
    },
  });
}

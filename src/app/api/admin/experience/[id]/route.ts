import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getExperience, saveExperience } from "@/lib/store";
import { Experience } from "@/lib/types";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

const TYPES = ["work", "education", "organization"] as const;

function sanitize(body: Record<string, unknown>): Omit<Experience, "id" | "createdAt"> | null {
  const role = String(body.role ?? "").slice(0, 120).trim();
  const organization = String(body.organization ?? "").slice(0, 120).trim();
  const startDate = String(body.startDate ?? "").slice(0, 20).trim();
  const endDate = String(body.endDate ?? "").slice(0, 20).trim();
  const description = String(body.description ?? "").slice(0, 800).trim();
  const type = TYPES.includes(body.type as (typeof TYPES)[number])
    ? (body.type as Experience["type"])
    : "work";
  if (!role || !organization || !startDate || !endDate || !description) return null;
  return { role, organization, type, startDate, endDate, description };
}

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Ctx) {
  if (!(await isAdmin())) return unauthorized();
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const clean = sanitize(body);
  if (!clean) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  const list = await getExperience();
  const idx = list.findIndex((x) => x.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  list[idx] = { ...list[idx], ...clean };
  await saveExperience(list);
  return NextResponse.json({ experience: list });
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  if (!(await isAdmin())) return unauthorized();
  const { id } = await params;
  const list = await getExperience();
  const filtered = list.filter((x) => x.id !== id);
  if (filtered.length === list.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await saveExperience(filtered);
  return NextResponse.json({ experience: filtered });
}

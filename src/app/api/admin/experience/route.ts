import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getExperience, newId, saveExperience } from "@/lib/store";
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

export async function GET() {
  if (!(await isAdmin())) return unauthorized();
  return NextResponse.json({ experience: await getExperience() });
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return unauthorized();
  const body = await req.json().catch(() => ({}));
  const clean = sanitize(body);
  if (!clean) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  const entry: Experience = { ...clean, id: newId("exp"), createdAt: Date.now() };
  const list = await getExperience();
  list.unshift(entry);
  await saveExperience(list);
  return NextResponse.json({ experience: list }, { status: 201 });
}

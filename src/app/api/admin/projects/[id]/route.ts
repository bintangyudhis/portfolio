import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getProjects, saveProjects } from "@/lib/store";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function sanitize(body: Record<string, unknown>) {
  const title = String(body.title ?? "").slice(0, 120).trim();
  const description = String(body.description ?? "").slice(0, 600).trim();
  const year = String(body.year ?? "").slice(0, 9).trim();
  if (!title || !description || !year) return null;

  const techRaw = Array.isArray(body.tech) ? body.tech : String(body.tech ?? "").split(",");
  const tech = techRaw
    .map((t) => String(t).slice(0, 40).trim())
    .filter(Boolean)
    .slice(0, 12);

  const url = (u: unknown) => {
    const s = String(u ?? "").slice(0, 300).trim();
    if (!s) return undefined;
    try {
      const parsed = new URL(s);
      if (!["http:", "https:"].includes(parsed.protocol)) return undefined;
      return parsed.toString();
    } catch {
      return undefined;
    }
  };

  return {
    title,
    description,
    tech,
    githubUrl: url(body.githubUrl),
    liveUrl: url(body.liveUrl),
    featured: body.featured === true,
    year,
  };
}

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Ctx) {
  if (!(await isAdmin())) return unauthorized();
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const clean = sanitize(body);
  if (!clean) {
    return NextResponse.json({ error: "Title, description, and year are required." }, { status: 400 });
  }
  const list = await getProjects();
  const idx = list.findIndex((p) => p.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  list[idx] = { ...list[idx], ...clean };
  await saveProjects(list);
  return NextResponse.json({ projects: list });
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  if (!(await isAdmin())) return unauthorized();
  const { id } = await params;
  const list = await getProjects();
  const filtered = list.filter((p) => p.id !== id);
  if (filtered.length === list.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await saveProjects(filtered);
  return NextResponse.json({ projects: filtered });
}

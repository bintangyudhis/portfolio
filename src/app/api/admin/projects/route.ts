import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getProjects, newId, saveProjects } from "@/lib/store";
import { Project } from "@/lib/types";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function sanitize(body: Record<string, unknown>): Omit<Project, "id" | "createdAt"> | null {
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

export async function GET() {
  if (!(await isAdmin())) return unauthorized();
  return NextResponse.json({ projects: await getProjects() });
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return unauthorized();
  const body = await req.json().catch(() => ({}));
  const clean = sanitize(body);
  if (!clean) {
    return NextResponse.json({ error: "Title, description, and year are required." }, { status: 400 });
  }
  const project: Project = { ...clean, id: newId("proj"), createdAt: Date.now() };
  const list = await getProjects();
  list.unshift(project);
  await saveProjects(list);
  return NextResponse.json({ projects: list }, { status: 201 });
}

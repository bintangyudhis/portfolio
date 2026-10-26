import { NextRequest, NextResponse } from "next/server";
import { adminDb, afterWrite, badRequest, dbError } from "@/lib/admin-route";
import { profileToRow, rowToProfile } from "@/lib/admin-db";
import type { ProfileContent } from "@/lib/content";
import {
  isObj,
  optString,
  parseFocus,
  parseLanguages,
  parseLocalized,
  parseParagraphs,
  reqString,
} from "@/lib/admin-validate";

export async function GET() {
  const { sb, error } = await adminDb();
  if (error) return error;
  const { data, error: qError } = await sb
    .from("portfolio_profile")
    .select("*")
    .eq("id", 1)
    .maybeSingle();
  if (qError) return dbError(qError.message);
  if (!data) {
    return NextResponse.json(
      { error: "Baris profil belum ada di database — jalankan seed.sql terlebih dahulu." },
      { status: 404 }
    );
  }
  return NextResponse.json({ profile: rowToProfile(data) });
}

export async function PUT(req: NextRequest) {
  const { sb, error } = await adminDb();
  if (error) return error;
  const body = await req.json().catch(() => null);
  if (!isObj(body)) return badRequest("Body harus berupa objek JSON.");

  const name = reqString(body.name, 120);
  const university = reqString(body.university, 200);
  const email = reqString(body.email, 200);
  const role = parseLocalized(body.role, 300);
  const location = parseLocalized(body.location, 300);
  const heroLine = parseLocalized(body.heroLine, 1000);
  const intro = parseLocalized(body.intro, 4000);
  const about = parseParagraphs(body.about);
  const focus = parseFocus(body.focus);
  const languages = parseLanguages(body.languages);
  if (!name || !university || !email || !role || !location || !heroLine || !intro || !about || !focus || !languages) {
    return badRequest("Field profil tidak lengkap atau tidak valid (nama, universitas, email, dan semua teks ID/EN/JP wajib diisi).");
  }

  const profile: ProfileContent = {
    name,
    university,
    email,
    role,
    location,
    heroLine,
    intro,
    about,
    focus,
    languages,
    githubUrl: reqString(body.githubUrl, 500) ?? "",
    linkedinUrl: reqString(body.linkedinUrl, 500) ?? "",
    instagramUrl: optString(body.instagramUrl, 500) ?? "",
    discordUrl: optString(body.discordUrl, 500) ?? "",
    photoUrl: optString(body.photoUrl, 1000) ?? undefined,
    cvUrl: optString(body.cvUrl, 1000) ?? undefined,
    email2: optString(body.email2, 200) ?? undefined,
  };
  if (!profile.githubUrl || !profile.linkedinUrl) {
    return badRequest("URL GitHub dan LinkedIn wajib diisi.");
  }

  const { error: qError } = await sb
    .from("portfolio_profile")
    .upsert(profileToRow(profile), { onConflict: "id" });
  if (qError) return dbError(qError.message);
  afterWrite();
  return NextResponse.json({ ok: true, profile });
}

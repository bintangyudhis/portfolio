import { NextRequest, NextResponse } from "next/server";
import { adminDb, badRequest, dbError } from "@/lib/admin-route";

const BUCKET = "portfolio-media";
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB for images
const CV_MAX_BYTES = 10 * 1024 * 1024; // 10 MB for the CV PDF
const TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
};

function slugify(name: string): string {
  const s = name
    .toLowerCase()
    .replace(/\.[^.]*$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return s.slice(0, 40) || "gambar";
}

export async function POST(req: NextRequest) {
  const { sb, error } = await adminDb();
  if (error) return error;

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return badRequest("Tidak ada berkas yang diunggah (field 'file').");
  }

  // CV uploads are special-cased: PDF only, larger cap, stored under cv/.
  // Everything else keeps the original image rules.
  const purpose = form?.get("purpose");
  const isCv = purpose === "cv" || purpose === "cv-en";
  let path: string;
  if (isCv) {
    if (file.type !== "application/pdf") {
      return badRequest("Format tidak didukung. Gunakan berkas PDF untuk CV.");
    }
    if (file.size === 0 || file.size > CV_MAX_BYTES) {
      return badRequest("Ukuran CV harus antara 1 byte dan 10 MB.");
    }
    path = `cv/${Date.now()}-${slugify(file.name)}.pdf`;
  } else {
    const ext = TYPES[file.type];
    if (!ext) {
      return badRequest("Format tidak didukung — gunakan PNG, JPG, WebP, atau GIF.");
    }
    if (file.size === 0 || file.size > MAX_BYTES) {
      return badRequest("Ukuran berkas harus antara 1 byte dan 5 MB.");
    }
    path = `${Date.now()}-${slugify(file.name)}.${ext}`;
  }

  const bytes = await file.arrayBuffer();
  const { error: upError } = await sb.storage.from(BUCKET).upload(path, bytes, {
    contentType: file.type,
    upsert: false,
  });
  if (upError) return dbError(`Unggah gagal: ${upError.message}`);

  const { data } = sb.storage.from(BUCKET).getPublicUrl(path);
  return NextResponse.json({ ok: true, url: data.publicUrl, path }, { status: 201 });
}

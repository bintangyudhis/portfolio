"use client";

// Image picker for the CMS: shows the current image + its URL (editable as
// text, so an external URL also works) and uploads a new file to the
// portfolio-media bucket through /api/admin/upload.

import { useRef, useState } from "react";
import { btnSmall, inputCls, labelCls } from "./ui";

export default function ImageUpload({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setBusy(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data: unknown = await res.json().catch(() => null);
      if (!res.ok) {
        const message =
          data && typeof data === "object" && "error" in data
            ? String((data as Record<string, unknown>).error)
            : `Unggah gagal (${res.status}).`;
        throw new Error(message);
      }
      onChange(String((data as Record<string, unknown>).url));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unggah gagal.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <span className={labelCls}>{label}</span>
      <div className="mt-1 flex flex-wrap items-start gap-4">
        {value ? (
          // Plain <img>: admin preview of an arbitrary storage URL.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt=""
            className="h-24 w-36 border border-line object-cover"
          />
        ) : (
          <div className="flex h-24 w-36 items-center justify-center border border-dashed border-line text-xs text-faded">
            Belum ada gambar
          </div>
        )}
        <div className="min-w-56 flex-1 space-y-2">
          <input
            className={inputCls}
            value={value}
            placeholder="https://… (URL gambar)"
            onChange={(e) => onChange(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              className={btnSmall}
              disabled={busy}
              onClick={() => fileRef.current?.click()}
            >
              {busy ? "Mengunggah…" : "Unggah berkas"}
            </button>
            {value && (
              <button type="button" className={btnSmall} onClick={() => onChange("")}>
                Hapus gambar
              </button>
            )}
            <span className="text-xs text-faded">PNG/JPG/WebP/GIF, maks 5 MB.</span>
          </div>
          {error && <p className="text-sm font-medium text-flame">{error}</p>}
        </div>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void upload(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}

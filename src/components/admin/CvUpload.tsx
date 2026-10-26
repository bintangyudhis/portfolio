"use client";

// CV picker for the CMS: shows the current PDF link and uploads a new
// file through /api/admin/upload with purpose "cv" (PDF only, 10 MB cap,
// stored under the cv/ prefix of the portfolio-media bucket).

import { useRef, useState } from "react";
import { btnSmall, inputCls, labelCls } from "./ui";

export default function CvUpload({
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
      form.append("purpose", "cv");
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
      <div className="mt-1 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <input
            className={`${inputCls} min-w-56 flex-1`}
            value={value}
            placeholder="https://… (URL berkas PDF)"
            onChange={(e) => onChange(e.target.value)}
          />
          {value && (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className={btnSmall}
            >
              Buka berkas
            </a>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={btnSmall}
            disabled={busy}
            onClick={() => fileRef.current?.click()}
          >
            {busy ? "Mengunggah…" : value ? "Ganti berkas" : "Unggah berkas"}
          </button>
          {value && (
            <button type="button" className={btnSmall} onClick={() => onChange("")}>
              Hapus CV
            </button>
          )}
          <span className="text-xs text-faded">PDF, maks 10 MB.</span>
        </div>
        {error && <p className="text-sm font-medium text-flame">{error}</p>}
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="application/pdf"
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

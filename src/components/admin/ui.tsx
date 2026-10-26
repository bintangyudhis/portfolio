"use client";

// Shared building blocks for the admin CMS screens: a tiny fetch wrapper
// and plain form controls (Indonesian UI, styled with the site's tokens).

import type { Localized } from "@/lib/i18n";

export const inputCls =
  "w-full border border-line bg-white/60 px-3 py-2 text-sm text-ink placeholder:text-faded/70 focus:border-flame focus:outline-none";
export const labelCls = "block text-[13px] font-semibold tracking-wide text-ink";
export const btnPrimary =
  "bg-flame px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-ink disabled:opacity-50";
export const btnGhost =
  "border border-ink px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper disabled:opacity-50";
export const btnSmall =
  "border border-line px-3 py-1.5 text-[13px] font-semibold text-ink transition-colors hover:border-ink disabled:opacity-50";
export const btnDanger =
  "border border-flame/50 px-3 py-1.5 text-[13px] font-semibold text-flame transition-colors hover:bg-flame hover:text-paper disabled:opacity-50";

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  const data: unknown = await res.json().catch(() => null);
  if (!res.ok) {
    const message =
      data && typeof data === "object" && "error" in data
        ? String((data as Record<string, unknown>).error)
        : `Permintaan gagal (${res.status}).`;
    throw new ApiError(res.status, message);
  }
  return data as T;
}

export type SaveState =
  | { kind: "idle" }
  | { kind: "saving" }
  | { kind: "ok"; message: string }
  | { kind: "error"; message: string };

export function StatusLine({ state }: { state: SaveState }) {
  if (state.kind === "idle") return null;
  if (state.kind === "saving")
    return <p className="text-sm text-faded">Menyimpan…</p>;
  if (state.kind === "ok")
    return (
      <p className="border border-line bg-panel px-3 py-2 text-sm font-medium text-ink">
        ✓ {state.message}
      </p>
    );
  return (
    <p className="border border-flame/60 bg-flame/10 px-3 py-2 text-sm font-medium text-flame">
      {state.message}
    </p>
  );
}

export function DbOff({ message }: { message: string }) {
  return (
    <div className="border border-line bg-panel px-5 py-6">
      <h2 className="font-display text-xl font-semibold text-ink">Database belum terhubung</h2>
      <p className="mt-2 max-w-prose leading-relaxed text-ink/80">{message}</p>
      <p className="mt-2 max-w-prose leading-relaxed text-faded">
        Situs publik tetap tampil dari data cadangan. Setelah env dipasang dan migrasi +
        seed dijalankan, halaman ini langsung mengelola konten dari database.
      </p>
    </div>
  );
}

export function LoadingNote() {
  return <p className="text-sm text-faded">Memuat data…</p>;
}

export function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <input
        className={`${inputCls} mt-1`}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && <span className="mt-1 block text-xs text-faded">{hint}</span>}
    </label>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  rows = 4,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <textarea
        className={`${inputCls} mt-1 leading-relaxed`}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && <span className="mt-1 block text-xs text-faded">{hint}</span>}
    </label>
  );
}

const LANG_LABELS: { key: keyof Localized; tag: string }[] = [
  { key: "id", tag: "ID" },
  { key: "en", tag: "EN" },
  { key: "jp", tag: "JP" },
];

export function LocalizedField({
  label,
  value,
  onChange,
  multiline = false,
  rows = 3,
}: {
  label: string;
  value: Localized;
  onChange: (v: Localized) => void;
  multiline?: boolean;
  rows?: number;
}) {
  return (
    <fieldset>
      <legend className={labelCls}>{label}</legend>
      <div className="mt-1 space-y-2">
        {LANG_LABELS.map(({ key, tag }) => (
          <label key={key} className="flex items-start gap-2">
            <span className="mt-2 w-7 shrink-0 font-mono text-xs font-semibold text-faded">
              {tag}
            </span>
            {multiline ? (
              <textarea
                className={`${inputCls} leading-relaxed`}
                rows={rows}
                value={value[key]}
                onChange={(e) => onChange({ ...value, [key]: e.target.value })}
              />
            ) : (
              <input
                className={inputCls}
                value={value[key]}
                onChange={(e) => onChange({ ...value, [key]: e.target.value })}
              />
            )}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import type { ExperienceItem } from "@/lib/content";
import type { Localized } from "@/lib/i18n";
import {
  ApiError,
  DbOff,
  LoadingNote,
  LocalizedField,
  StatusLine,
  TextField,
  api,
  btnDanger,
  btnPrimary,
  btnSmall,
  inputCls,
  labelCls,
  type SaveState,
} from "@/components/admin/ui";

const emptyLoc = (): Localized => ({ id: "", en: "", jp: "" });
const KINDS = [
  { value: "work", label: "Pekerjaan" },
  { value: "organization", label: "Organisasi & komunitas" },
  { value: "education", label: "Pendidikan" },
  { value: "open-source", label: "Open source" },
];

const blank = (): ExperienceItem => ({
  slug: "",
  kind: "work",
  org: "",
  period: emptyLoc(),
  role: emptyLoc(),
  description: emptyLoc(),
  sort: 0,
});

export default function PengalamanPage() {
  const [items, setItems] = useState<ExperienceItem[] | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [editing, setEditing] = useState<ExperienceItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [save, setSave] = useState<SaveState>({ kind: "idle" });

  const load = useCallback(() => {
    api<{ items: ExperienceItem[] }>("/api/admin/experiences")
      .then(({ items: list }) => setItems(list))
      .catch((err: unknown) => setError(err as ApiError));
  }, []);

  useEffect(load, [load]);

  if (error) {
    return error.status === 503 ? (
      <DbOff message={error.message} />
    ) : (
      <p className="border border-flame/60 bg-flame/10 px-3 py-2 text-sm font-medium text-flame">
        {error.message}
      </p>
    );
  }
  if (!items) return <LoadingNote />;

  const set = <K extends keyof ExperienceItem>(key: K, value: ExperienceItem[K]) =>
    setEditing((e) => (e ? { ...e, [key]: value } : e));

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!editing) return;
    setSave({ kind: "saving" });
    try {
      if (isNew) {
        await api("/api/admin/experiences", {
          method: "POST",
          body: JSON.stringify(editing),
        });
      } else {
        await api(`/api/admin/experiences/${editing.slug}`, {
          method: "PUT",
          body: JSON.stringify(editing),
        });
      }
      setSave({ kind: "ok", message: "Pengalaman tersimpan." });
      setEditing(null);
      setIsNew(false);
      load();
    } catch (err) {
      setSave({
        kind: "error",
        message: err instanceof Error ? err.message : "Gagal menyimpan.",
      });
    }
  }

  async function remove(item: ExperienceItem) {
    if (!window.confirm(`Hapus pengalaman "${item.org}"? Tindakan ini tidak bisa dibatalkan.`))
      return;
    try {
      await api(`/api/admin/experiences/${item.slug}`, { method: "DELETE" });
      if (editing?.slug === item.slug) setEditing(null);
      load();
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Gagal menghapus.");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink">Pengalaman</h1>
          <p className="mt-2 leading-relaxed text-faded">
            Timeline pekerjaan, organisasi, pendidikan, dan open source.
          </p>
        </div>
        <button
          type="button"
          className={btnPrimary}
          onClick={() => {
            setEditing({ ...blank(), sort: (items.at(-1)?.sort ?? 0) + 1 });
            setIsNew(true);
            setSave({ kind: "idle" });
          }}
        >
          + Tambah pengalaman
        </button>
      </div>

      <div className="mt-6 border-t border-line">
        {items.map((item) => (
          <div
            key={item.slug}
            className="flex flex-wrap items-center gap-3 border-b border-line py-3"
          >
            <span className="w-8 font-mono text-xs text-faded">{item.sort}</span>
            <div className="min-w-52 flex-1">
              <p className="font-semibold text-ink">{item.org}</p>
              <p className="text-sm text-faded">
                {item.role.id} · {item.period.id}
              </p>
            </div>
            <span className="font-mono text-xs text-faded">{item.slug}</span>
            <button
              type="button"
              className={btnSmall}
              onClick={() => {
                setEditing(item);
                setIsNew(false);
                setSave({ kind: "idle" });
              }}
            >
              Ubah
            </button>
            <button type="button" className={btnDanger} onClick={() => remove(item)}>
              Hapus
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="py-6 text-sm text-faded">Belum ada pengalaman.</p>
        )}
      </div>

      {editing && (
        <form onSubmit={submit} className="mt-8 space-y-4 border border-line p-5">
          <h2 className="font-display text-xl font-semibold text-ink">
            {isNew ? "Tambah pengalaman" : `Ubah — ${editing.org || editing.slug}`}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Slug (ID unik)"
              value={editing.slug}
              onChange={(v) => set("slug", v)}
              hint={isNew ? "Huruf kecil, angka, tanda hubung." : "Slug tidak bisa diubah."}
            />
            <label className="block">
              <span className={labelCls}>Jenis</span>
              <select
                className={`${inputCls} mt-1`}
                value={editing.kind}
                onChange={(e) => set("kind", e.target.value as ExperienceItem["kind"])}
              >
                {KINDS.map((k) => (
                  <option key={k.value} value={k.value}>
                    {k.label}
                  </option>
                ))}
              </select>
            </label>
            <TextField
              label="Organisasi / perusahaan"
              value={editing.org}
              onChange={(v) => set("org", v)}
            />
            <TextField
              label="Urutan (sort)"
              type="number"
              value={String(editing.sort)}
              onChange={(v) => set("sort", Number(v) || 0)}
            />
          </div>
          <LocalizedField
            label="Periode"
            value={editing.period}
            onChange={(v) => set("period", v)}
          />
          <LocalizedField
            label="Jabatan / peran"
            value={editing.role}
            onChange={(v) => set("role", v)}
          />
          <LocalizedField
            label="Deskripsi"
            value={editing.description}
            onChange={(v) => set("description", v)}
            multiline
            rows={4}
          />
          <div className="flex items-center gap-3 pt-1">
            <button type="submit" className={btnPrimary} disabled={save.kind === "saving"}>
              Simpan
            </button>
            <button
              type="button"
              className={btnSmall}
              onClick={() => setEditing(null)}
            >
              Batal
            </button>
          </div>
          <StatusLine state={save} />
        </form>
      )}
    </div>
  );
}

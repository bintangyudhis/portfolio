"use client";

import { useCallback, useEffect, useState } from "react";
import type { PublicationItem } from "@/lib/content";
import {
  ApiError,
  DbOff,
  LoadingNote,
  StatusLine,
  TextField,
  api,
  btnDanger,
  btnPrimary,
  btnSmall,
  type SaveState,
} from "@/components/admin/ui";

const blank = (): PublicationItem => ({
  slug: "",
  title: "",
  venue: "",
  sort: 0,
});

export default function PublikasiPage() {
  const [items, setItems] = useState<PublicationItem[] | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [editing, setEditing] = useState<PublicationItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [save, setSave] = useState<SaveState>({ kind: "idle" });

  const load = useCallback(() => {
    api<{ items: PublicationItem[] }>("/api/admin/publications")
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

  const set = <K extends keyof PublicationItem>(key: K, value: PublicationItem[K]) =>
    setEditing((e) => (e ? { ...e, [key]: value } : e));

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!editing) return;
    setSave({ kind: "saving" });
    try {
      if (isNew) {
        await api("/api/admin/publications", {
          method: "POST",
          body: JSON.stringify(editing),
        });
      } else {
        await api(`/api/admin/publications/${editing.slug}`, {
          method: "PUT",
          body: JSON.stringify(editing),
        });
      }
      setSave({ kind: "ok", message: "Publikasi tersimpan." });
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

  async function remove(item: PublicationItem) {
    if (!window.confirm(`Hapus publikasi "${item.title}"? Tindakan ini tidak bisa dibatalkan.`))
      return;
    try {
      await api(`/api/admin/publications/${item.slug}`, { method: "DELETE" });
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
          <h1 className="font-display text-3xl font-semibold text-ink">Publikasi</h1>
          <p className="mt-2 leading-relaxed text-faded">
            Jurnal dan prosiding konferensi yang tampil di bagian Publikasi.
          </p>
        </div>
        <button
          type="button"
          className={btnPrimary}
          onClick={() => {
            setEditing({ ...blank(), sort: (items[items.length - 1]?.sort ?? 0) + 1 });
            setIsNew(true);
            setSave({ kind: "idle" });
          }}
        >
          + Tambah publikasi
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
              <p className="font-semibold text-ink">{item.title}</p>
              <p className="text-sm text-faded">
                {[item.venue, item.year].filter(Boolean).join(" · ") || "—"}
              </p>
            </div>
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
          <p className="py-6 text-sm text-faded">Belum ada publikasi.</p>
        )}
      </div>

      {editing && (
        <form onSubmit={submit} className="mt-8 space-y-4 border border-line p-5">
          <h2 className="font-display text-xl font-semibold text-ink">
            {isNew ? "Tambah publikasi" : `Ubah — ${editing.title || editing.slug}`}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Slug (ID unik)"
              value={editing.slug}
              onChange={(v) => set("slug", v)}
              hint={isNew ? "Huruf kecil, angka, tanda hubung." : "Slug tidak bisa diubah."}
            />
            <TextField
              label="Urutan (sort)"
              type="number"
              value={String(editing.sort)}
              onChange={(v) => set("sort", Number(v) || 0)}
            />
            <TextField label="Judul" value={editing.title} onChange={(v) => set("title", v)} />
            <TextField
              label="Venue (jurnal / konferensi, boleh kosong)"
              value={editing.venue}
              onChange={(v) => set("venue", v)}
            />
            <TextField
              label="Tahun (boleh kosong)"
              type="number"
              value={editing.year ? String(editing.year) : ""}
              onChange={(v) => set("year", v ? Number(v) || undefined : undefined)}
            />
            <TextField
              label="URL (opsional)"
              value={editing.url ?? ""}
              onChange={(v) => set("url", v || undefined)}
            />
          </div>
          <div className="flex items-center gap-3 pt-1">
            <button type="submit" className={btnPrimary} disabled={save.kind === "saving"}>
              Simpan
            </button>
            <button type="button" className={btnSmall} onClick={() => setEditing(null)}>
              Batal
            </button>
          </div>
          <StatusLine state={save} />
        </form>
      )}
    </div>
  );
}

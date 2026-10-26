"use client";

import { useCallback, useEffect, useState } from "react";
import type { ProjectItem } from "@/lib/content";
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
  labelCls,
  type SaveState,
} from "@/components/admin/ui";
import ImageUpload from "@/components/admin/ImageUpload";

const emptyLoc = (): Localized => ({ id: "", en: "", jp: "" });

const blank = (): ProjectItem => ({
  slug: "",
  title: "",
  year: String(new Date().getFullYear()),
  tech: [],
  description: emptyLoc(),
  featured: false,
  sort: 0,
});

export default function ProyekPage() {
  const [items, setItems] = useState<ProjectItem[] | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [editing, setEditing] = useState<ProjectItem | null>(null);
  const [techText, setTechText] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [save, setSave] = useState<SaveState>({ kind: "idle" });

  const load = useCallback(() => {
    api<{ items: ProjectItem[] }>("/api/admin/projects")
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

  const set = <K extends keyof ProjectItem>(key: K, value: ProjectItem[K]) =>
    setEditing((e) => (e ? { ...e, [key]: value } : e));

  function openEdit(item: ProjectItem, fresh: boolean) {
    setEditing(item);
    setTechText(item.tech.join(", "));
    setIsNew(fresh);
    setSave({ kind: "idle" });
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!editing) return;
    setSave({ kind: "saving" });
    const payload: ProjectItem = {
      ...editing,
      tech: techText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    try {
      if (isNew) {
        await api("/api/admin/projects", { method: "POST", body: JSON.stringify(payload) });
      } else {
        await api(`/api/admin/projects/${editing.slug}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      }
      setSave({ kind: "ok", message: "Proyek tersimpan." });
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

  async function remove(item: ProjectItem) {
    if (!window.confirm(`Hapus proyek "${item.title}"? Tindakan ini tidak bisa dibatalkan.`))
      return;
    try {
      await api(`/api/admin/projects/${item.slug}`, { method: "DELETE" });
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
          <h1 className="font-display text-3xl font-semibold text-ink">Proyek</h1>
          <p className="mt-2 leading-relaxed text-faded">
            Daftar proyek yang tampil di halaman publik, termasuk gambarnya.
          </p>
        </div>
        <button
          type="button"
          className={btnPrimary}
          onClick={() =>
            openEdit({ ...blank(), sort: (items[items.length - 1]?.sort ?? 0) + 1 }, true)
          }
        >
          + Tambah proyek
        </button>
      </div>

      <div className="mt-6 border-t border-line">
        {items.map((item) => (
          <div
            key={item.slug}
            className="flex flex-wrap items-center gap-3 border-b border-line py-3"
          >
            <span className="w-8 font-mono text-xs text-faded">{item.sort}</span>
            {item.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.imageUrl} alt="" className="h-10 w-16 border border-line object-cover" />
            ) : (
              <span className="flex h-10 w-16 items-center justify-center border border-dashed border-line text-[10px] text-faded">
                tak ada
              </span>
            )}
            <div className="min-w-52 flex-1">
              <p className="font-semibold text-ink">
                {item.title}
                {item.featured && <span className="text-flame"> · unggulan</span>}
              </p>
              <p className="text-sm text-faded">
                {item.year} · {item.tech.join(" · ")}
              </p>
            </div>
            <button type="button" className={btnSmall} onClick={() => openEdit(item, false)}>
              Ubah
            </button>
            <button type="button" className={btnDanger} onClick={() => remove(item)}>
              Hapus
            </button>
          </div>
        ))}
        {items.length === 0 && <p className="py-6 text-sm text-faded">Belum ada proyek.</p>}
      </div>

      {editing && (
        <form onSubmit={submit} className="mt-8 space-y-4 border border-line p-5">
          <h2 className="font-display text-xl font-semibold text-ink">
            {isNew ? "Tambah proyek" : `Ubah — ${editing.title || editing.slug}`}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Slug (ID unik)"
              value={editing.slug}
              onChange={(v) => set("slug", v)}
              hint={isNew ? "Huruf kecil, angka, tanda hubung." : "Slug tidak bisa diubah."}
            />
            <TextField label="Judul" value={editing.title} onChange={(v) => set("title", v)} />
            <TextField label="Tahun" value={editing.year} onChange={(v) => set("year", v)} />
            <TextField
              label="Urutan (sort)"
              type="number"
              value={String(editing.sort)}
              onChange={(v) => set("sort", Number(v) || 0)}
            />
          </div>
          <TextField
            label="Teknologi (pisahkan dengan koma)"
            value={techText}
            onChange={setTechText}
            placeholder="Next.js, TypeScript, Supabase"
          />
          <LocalizedField
            label="Deskripsi"
            value={editing.description}
            onChange={(v) => set("description", v)}
            multiline
            rows={4}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="URL repositori"
              value={editing.repoUrl ?? ""}
              onChange={(v) => set("repoUrl", v || undefined)}
            />
            <TextField
              label="URL live"
              value={editing.liveUrl ?? ""}
              onChange={(v) => set("liveUrl", v || undefined)}
            />
          </div>
          <ImageUpload
            label="Gambar proyek"
            value={editing.imageUrl ?? ""}
            onChange={(url) => set("imageUrl", url || undefined)}
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={editing.featured}
              onChange={(e) => set("featured", e.target.checked)}
              className="h-4 w-4 accent-[#b33e15]"
            />
            <span className={labelCls}>Tandai sebagai proyek unggulan</span>
          </label>
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

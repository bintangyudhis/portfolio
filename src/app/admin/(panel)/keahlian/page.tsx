"use client";

import { useCallback, useEffect, useState } from "react";
import type { SkillGroup, SkillLevel } from "@/lib/content";
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
const LEVELS: { value: SkillLevel; label: string }[] = [
  { value: "advanced", label: "Mahir" },
  { value: "proficient", label: "Terampil" },
  { value: "exploring", label: "Sedang didalami" },
];

const blank = (): SkillGroup => ({
  slug: "",
  name: emptyLoc(),
  blurb: emptyLoc(),
  skills: [],
  sort: 0,
});

export default function KeahlianPage() {
  const [items, setItems] = useState<SkillGroup[] | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [editing, setEditing] = useState<SkillGroup | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [save, setSave] = useState<SaveState>({ kind: "idle" });

  const load = useCallback(() => {
    api<{ items: SkillGroup[] }>("/api/admin/skills")
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

  const set = <K extends keyof SkillGroup>(key: K, value: SkillGroup[K]) =>
    setEditing((e) => (e ? { ...e, [key]: value } : e));

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!editing) return;
    setSave({ kind: "saving" });
    try {
      if (isNew) {
        await api("/api/admin/skills", { method: "POST", body: JSON.stringify(editing) });
      } else {
        await api(`/api/admin/skills/${editing.slug}`, {
          method: "PUT",
          body: JSON.stringify(editing),
        });
      }
      setSave({ kind: "ok", message: "Kelompok keahlian tersimpan." });
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

  async function remove(item: SkillGroup) {
    if (!window.confirm(`Hapus kelompok "${item.name.id}"? Tindakan ini tidak bisa dibatalkan.`))
      return;
    try {
      await api(`/api/admin/skills/${item.slug}`, { method: "DELETE" });
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
          <h1 className="font-display text-3xl font-semibold text-ink">Keahlian</h1>
          <p className="mt-2 leading-relaxed text-faded">
            Kelompok bidang dan skill di dalamnya, lengkap dengan tingkatnya.
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
          + Tambah kelompok
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
              <p className="font-semibold text-ink">{item.name.id}</p>
              <p className="text-sm text-faded">
                {item.skills.map((s) => s.name).join(" · ") || "—"}
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
          <p className="py-6 text-sm text-faded">Belum ada kelompok keahlian.</p>
        )}
      </div>

      {editing && (
        <form onSubmit={submit} className="mt-8 space-y-4 border border-line p-5">
          <h2 className="font-display text-xl font-semibold text-ink">
            {isNew ? "Tambah kelompok" : `Ubah — ${editing.name.id || editing.slug}`}
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
          </div>
          <LocalizedField
            label="Nama kelompok"
            value={editing.name}
            onChange={(v) => set("name", v)}
          />
          <LocalizedField
            label="Ringkasan"
            value={editing.blurb}
            onChange={(v) => set("blurb", v)}
            multiline
            rows={2}
          />

          <div className="space-y-2">
            <p className={labelCls}>Daftar skill</p>
            {editing.skills.map((skill, i) => (
              <div key={i} className="flex flex-wrap items-center gap-2">
                <input
                  className={`${inputCls} min-w-52 flex-1`}
                  value={skill.name}
                  placeholder="Nama skill"
                  onChange={(e) =>
                    set(
                      "skills",
                      editing.skills.map((s, j) =>
                        j === i ? { ...s, name: e.target.value } : s
                      )
                    )
                  }
                />
                <select
                  className={`${inputCls} w-44`}
                  value={skill.level}
                  onChange={(e) =>
                    set(
                      "skills",
                      editing.skills.map((s, j) =>
                        j === i ? { ...s, level: e.target.value as SkillLevel } : s
                      )
                    )
                  }
                >
                  {LEVELS.map((l) => (
                    <option key={l.value} value={l.value}>
                      {l.label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className={btnDanger}
                  onClick={() =>
                    set(
                      "skills",
                      editing.skills.filter((_, j) => j !== i)
                    )
                  }
                >
                  Hapus
                </button>
              </div>
            ))}
            <button
              type="button"
              className={btnSmall}
              onClick={() =>
                set("skills", [...editing.skills, { name: "", level: "proficient" }])
              }
            >
              + Tambah skill
            </button>
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

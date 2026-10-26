"use client";

import { useEffect, useState } from "react";
import type { ProfileContent } from "@/lib/content";
import type { Locale, Localized } from "@/lib/i18n";
import {
  ApiError,
  DbOff,
  LoadingNote,
  LocalizedField,
  StatusLine,
  TextAreaField,
  TextField,
  api,
  btnGhost,
  btnPrimary,
  btnSmall,
  type SaveState,
} from "@/components/admin/ui";
import ImageUpload from "@/components/admin/ImageUpload";
import CvUpload from "@/components/admin/CvUpload";

const LOCALES: Locale[] = ["id", "en", "jp"];
const emptyLoc = (): Localized => ({ id: "", en: "", jp: "" });

export default function ProfilPage() {
  const [profile, setProfile] = useState<ProfileContent | null>(null);
  const [aboutText, setAboutText] = useState<Record<Locale, string>>({
    id: "",
    en: "",
    jp: "",
  });
  const [error, setError] = useState<ApiError | null>(null);
  const [save, setSave] = useState<SaveState>({ kind: "idle" });

  useEffect(() => {
    api<{ profile: ProfileContent }>("/api/admin/profile")
      .then(({ profile: p }) => {
        setProfile(p);
        setAboutText({
          id: p.about.id.join("\n"),
          en: p.about.en.join("\n"),
          jp: p.about.jp.join("\n"),
        });
      })
      .catch((err: unknown) => setError(err as ApiError));
  }, []);

  if (error) {
    return error.status === 503 ? (
      <DbOff message={error.message} />
    ) : (
      <p className="border border-flame/60 bg-flame/10 px-3 py-2 text-sm font-medium text-flame">
        {error.message}
      </p>
    );
  }
  if (!profile) return <LoadingNote />;

  const set = <K extends keyof ProfileContent>(key: K, value: ProfileContent[K]) =>
    setProfile((p) => (p ? { ...p, [key]: value } : p));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;
    setSave({ kind: "saving" });
    const about = Object.fromEntries(
      LOCALES.map((loc) => [
        loc,
        aboutText[loc]
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      ])
    ) as Record<Locale, string[]>;
    try {
      await api("/api/admin/profile", {
        method: "PUT",
        body: JSON.stringify({ ...profile, about }),
      });
      setSave({ kind: "ok", message: "Profil tersimpan." });
    } catch (err) {
      setSave({
        kind: "error",
        message: err instanceof Error ? err.message : "Gagal menyimpan.",
      });
    }
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-ink">Profil</h1>
      <p className="mt-2 max-w-prose leading-relaxed text-faded">
        Identitas, teks perkenalan, tautan sosial, dan foto yang tampil di
        halaman publik.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-8">
        <section className="space-y-4">
          <h2 className="border-b border-line pb-2 text-sm font-bold tracking-wide text-ink uppercase">
            Identitas & kontak
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Nama" value={profile.name} onChange={(v) => set("name", v)} />
            <TextField
              label="Universitas"
              value={profile.university}
              onChange={(v) => set("university", v)}
            />
            <TextField
              label="Email"
              type="email"
              value={profile.email}
              onChange={(v) => set("email", v)}
            />
            <TextField
              label="Email kedua (tujuan formulir kontak)"
              type="email"
              value={profile.email2 ?? ""}
              onChange={(v) => set("email2", v)}
            />
            <TextField
              label="URL GitHub"
              value={profile.githubUrl}
              onChange={(v) => set("githubUrl", v)}
            />
            <TextField
              label="URL LinkedIn"
              value={profile.linkedinUrl}
              onChange={(v) => set("linkedinUrl", v)}
            />
            <TextField
              label="URL Instagram"
              value={profile.instagramUrl}
              onChange={(v) => set("instagramUrl", v)}
            />
            <TextField
              label="URL Discord"
              value={profile.discordUrl}
              onChange={(v) => set("discordUrl", v)}
            />
          </div>
          <ImageUpload
            label="Foto profil"
            value={profile.photoUrl ?? ""}
            onChange={(url) => set("photoUrl", url || undefined)}
          />
          <CvUpload
            label="CV (PDF)"
            value={profile.cvUrl ?? ""}
            onChange={(url) => set("cvUrl", url || undefined)}
          />
        </section>

        <section className="space-y-4">
          <h2 className="border-b border-line pb-2 text-sm font-bold tracking-wide text-ink uppercase">
            Teks utama (3 bahasa)
          </h2>
          <LocalizedField
            label="Peran"
            value={profile.role}
            onChange={(v) => set("role", v)}
          />
          <LocalizedField
            label="Lokasi"
            value={profile.location}
            onChange={(v) => set("location", v)}
          />
          <LocalizedField
            label="Kalimat tajam (hero)"
            value={profile.heroLine}
            onChange={(v) => set("heroLine", v)}
            multiline
            rows={2}
          />
          <LocalizedField
            label="Paragraf perkenalan (hero)"
            value={profile.intro}
            onChange={(v) => set("intro", v)}
            multiline
            rows={4}
          />
        </section>

        <section className="space-y-4">
          <h2 className="border-b border-line pb-2 text-sm font-bold tracking-wide text-ink uppercase">
            Tentang saya
          </h2>
          <p className="text-sm text-faded">Satu paragraf per baris, untuk tiap bahasa.</p>
          {LOCALES.map((loc) => (
            <TextAreaField
              key={loc}
              label={`Tentang — ${loc.toUpperCase()}`}
              rows={5}
              value={aboutText[loc]}
              onChange={(v) => setAboutText((a) => ({ ...a, [loc]: v }))}
            />
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="border-b border-line pb-2 text-sm font-bold tracking-wide text-ink uppercase">
            Fokus kerja
          </h2>
          {profile.focus.map((f, i) => (
            <div key={i} className="space-y-3 border border-line p-4">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs text-faded">Fokus {i + 1}</p>
                <button
                  type="button"
                  className="text-[13px] font-semibold text-flame"
                  onClick={() =>
                    set(
                      "focus",
                      profile.focus.filter((_, j) => j !== i)
                    )
                  }
                >
                  Hapus
                </button>
              </div>
              <LocalizedField
                label="Judul"
                value={f.title}
                onChange={(v) =>
                  set(
                    "focus",
                    profile.focus.map((x, j) => (j === i ? { ...x, title: v } : x))
                  )
                }
              />
              <LocalizedField
                label="Deskripsi"
                value={f.description}
                multiline
                rows={2}
                onChange={(v) =>
                  set(
                    "focus",
                    profile.focus.map((x, j) => (j === i ? { ...x, description: v } : x))
                  )
                }
              />
            </div>
          ))}
          <button
            type="button"
            className={btnSmall}
            onClick={() =>
              set("focus", [...profile.focus, { title: emptyLoc(), description: emptyLoc() }])
            }
          >
            + Tambah fokus
          </button>
        </section>

        <section className="space-y-4">
          <h2 className="border-b border-line pb-2 text-sm font-bold tracking-wide text-ink uppercase">
            Bahasa
          </h2>
          {profile.languages.map((lang, i) => (
            <div key={i} className="space-y-3 border border-line p-4">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs text-faded">Bahasa {i + 1}</p>
                <button
                  type="button"
                  className="text-[13px] font-semibold text-flame"
                  onClick={() =>
                    set(
                      "languages",
                      profile.languages.filter((_, j) => j !== i)
                    )
                  }
                >
                  Hapus
                </button>
              </div>
              <LocalizedField
                label="Nama bahasa"
                value={lang.name}
                onChange={(v) =>
                  set(
                    "languages",
                    profile.languages.map((x, j) => (j === i ? { ...x, name: v } : x))
                  )
                }
              />
              <LocalizedField
                label="Tingkat"
                value={lang.level}
                onChange={(v) =>
                  set(
                    "languages",
                    profile.languages.map((x, j) => (j === i ? { ...x, level: v } : x))
                  )
                }
              />
            </div>
          ))}
          <button
            type="button"
            className={btnSmall}
            onClick={() =>
              set("languages", [...profile.languages, { name: emptyLoc(), level: emptyLoc() }])
            }
          >
            + Tambah bahasa
          </button>
        </section>

        <div className="flex items-center gap-3 border-t border-line pt-5">
          <button type="submit" className={btnPrimary} disabled={save.kind === "saving"}>
            Simpan profil
          </button>
          <button type="button" className={btnGhost} onClick={() => window.location.reload()}>
            Muat ulang
          </button>
        </div>
        <StatusLine state={save} />
      </form>
    </div>
  );
}

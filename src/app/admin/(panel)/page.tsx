"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ApiError, DbOff, LoadingNote, api } from "@/components/admin/ui";

interface Overview {
  dbConnected: boolean;
  counts: {
    experiences: number;
    projects: number;
    skillGroups: number;
    certifications: number;
    messages: number;
    unreadMessages: number;
  };
}

const CARDS = [
  { key: "experiences", label: "Pengalaman", href: "/admin/pengalaman" },
  { key: "projects", label: "Proyek", href: "/admin/proyek" },
  { key: "skillGroups", label: "Kelompok Keahlian", href: "/admin/keahlian" },
  { key: "certifications", label: "Sertifikasi", href: "/admin/sertifikasi" },
  { key: "messages", label: "Pesan Masuk", href: "/admin/pesan" },
] as const;

export default function RingkasanPage() {
  const [data, setData] = useState<Overview | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    api<Overview>("/api/admin/overview")
      .then(setData)
      .catch((err: unknown) => setError(err as ApiError));
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-ink">Ringkasan</h1>
      <p className="mt-2 max-w-prose leading-relaxed text-faded">
        Kelola seluruh konten situs dari sini. Perubahan yang disimpan langsung
        terbaca oleh halaman publik.
      </p>

      <div className="mt-8">
        {error ? (
          error.status === 503 ? (
            <DbOff message={error.message} />
          ) : (
            <p className="border border-flame/60 bg-flame/10 px-3 py-2 text-sm font-medium text-flame">
              {error.message}
            </p>
          )
        ) : !data ? (
          <LoadingNote />
        ) : (
          <>
            <p className="flex items-center gap-2 text-sm font-medium text-ink">
              <span className="inline-block h-2 w-2 bg-flame" aria-hidden />
              Database terhubung — konten di bawah dibaca dari Supabase.
            </p>
            <div className="mt-5 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {CARDS.map((card) => (
                <Link
                  key={card.key}
                  href={card.href}
                  className="bg-paper px-5 py-5 transition-colors hover:bg-panel"
                >
                  <p className="font-display text-4xl font-semibold text-ink">
                    {data.counts[card.key]}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-faded">
                    {card.label}
                    {card.key === "messages" && data.counts.unreadMessages > 0 && (
                      <span className="text-flame">
                        {" "}
                        · {data.counts.unreadMessages} belum dibaca
                      </span>
                    )}
                  </p>
                </Link>
              ))}
              <Link
                href="/admin/profil"
                className="bg-paper px-5 py-5 transition-colors hover:bg-panel"
              >
                <p className="font-display text-4xl font-semibold text-ink">1</p>
                <p className="mt-1 text-sm font-semibold text-faded">Profil</p>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

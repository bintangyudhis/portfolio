"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ApiError,
  DbOff,
  LoadingNote,
  api,
  btnDanger,
  btnSmall,
} from "@/components/admin/ui";

interface AdminMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  ip: string | null;
  isRead: boolean;
  createdAt: string;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });
}

export default function PesanPage() {
  const [items, setItems] = useState<AdminMessage[] | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  const load = useCallback(() => {
    api<{ items: AdminMessage[] }>("/api/admin/messages")
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

  async function toggleRead(msg: AdminMessage) {
    try {
      await api(`/api/admin/messages/${msg.id}`, {
        method: "PATCH",
        body: JSON.stringify({ isRead: !msg.isRead }),
      });
      load();
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Gagal mengubah status pesan.");
    }
  }

  async function remove(msg: AdminMessage) {
    if (!window.confirm(`Hapus pesan dari "${msg.name}"? Tindakan ini tidak bisa dibatalkan.`))
      return;
    try {
      await api(`/api/admin/messages/${msg.id}`, { method: "DELETE" });
      load();
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Gagal menghapus pesan.");
    }
  }

  const unread = items.filter((m) => !m.isRead).length;

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-ink">Pesan Masuk</h1>
      <p className="mt-2 leading-relaxed text-faded">
        Pesan dari formulir kontak situs — terbaru di atas.
        {items.length > 0 && (
          <>
            {" "}
            Total {items.length} pesan, {unread} belum dibaca.
          </>
        )}
      </p>

      <div className="mt-6 space-y-4">
        {items.map((msg) => (
          <article
            key={msg.id}
            className={`border p-5 ${msg.isRead ? "border-line" : "border-ink/50 bg-panel/50"}`}
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="font-display text-lg font-semibold text-ink">{msg.subject}</h2>
              {!msg.isRead && (
                <span className="font-mono text-xs font-semibold text-flame">BARU</span>
              )}
              <span className="ml-auto font-mono text-xs text-faded">
                {formatDate(msg.createdAt)}
              </span>
            </div>
            <p className="mt-1 text-sm text-faded">
              Dari <span className="font-semibold text-ink">{msg.name}</span> ·{" "}
              <a className="underline underline-offset-2" href={`mailto:${msg.email}`}>
                {msg.email}
              </a>
              {msg.ip && <> · IP {msg.ip}</>}
            </p>
            <p className="mt-3 leading-relaxed whitespace-pre-wrap text-ink/85">{msg.message}</p>
            <div className="mt-4 flex gap-2">
              <button type="button" className={btnSmall} onClick={() => toggleRead(msg)}>
                {msg.isRead ? "Tandai belum dibaca" : "Tandai sudah dibaca"}
              </button>
              <button type="button" className={btnDanger} onClick={() => remove(msg)}>
                Hapus
              </button>
            </div>
          </article>
        ))}
        {items.length === 0 && (
          <p className="border border-line px-5 py-6 text-sm text-faded">
            Belum ada pesan masuk.
          </p>
        )}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LINKS = [
  { href: "/admin", label: "Ringkasan" },
  { href: "/admin/profil", label: "Profil" },
  { href: "/admin/pengalaman", label: "Pengalaman" },
  { href: "/admin/proyek", label: "Proyek" },
  { href: "/admin/keahlian", label: "Keahlian" },
  { href: "/admin/sertifikasi", label: "Sertifikasi" },
  { href: "/admin/pesan", label: "Pesan Masuk" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => null);
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <nav className="space-y-1">
      <p className="px-3 pb-2 font-mono text-xs tracking-wide text-faded uppercase">
        CMS Portofolio
      </p>
      {LINKS.map((link) => {
        const active =
          link.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-3 py-2 text-sm font-semibold ${
              active
                ? "bg-ink text-paper"
                : "text-ink transition-colors hover:bg-panel"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
      <div className="space-y-1 border-t border-line pt-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="block px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-panel"
        >
          Lihat Situs ↗
        </a>
        <button
          type="button"
          onClick={logout}
          className="block w-full px-3 py-2 text-left text-sm font-semibold text-flame transition-colors hover:bg-panel"
        >
          Keluar
        </button>
      </div>
    </nav>
  );
}

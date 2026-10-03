"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/lib/seed";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-white/10 bg-ink-900/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 md:flex-row">
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js.
        </p>
        <div className="flex items-center gap-4 text-sm">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 transition hover:text-white"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 transition hover:text-white"
          >
            LinkedIn
          </a>
          <Link href="/contact" className="text-slate-400 transition hover:text-white">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}

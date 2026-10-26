"use client";

import { useState } from "react";
import { CloseIcon, MenuIcon } from "./icons";

/**
 * Mobile navigation: a hamburger button in the header bar that opens a
 * simple stacked panel under the header. Desktop keeps inline links.
 */
export default function MobileMenu({
  links,
  label,
}: {
  links: { href: string; label: string }[];
  label: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={label}
        className="grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-line bg-panel text-ink transition-colors hover:text-flame min-[360px]:h-9 min-[360px]:w-9 sm:h-10 sm:w-10 md:hidden"
      >
        {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
      </button>
      {open && (
        <nav
          aria-label={label}
          className="absolute inset-x-0 top-full border-b border-line bg-paper px-5 pt-1 pb-3 md:hidden"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line/60 py-3 font-medium text-ink last:border-b-0"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </>
  );
}

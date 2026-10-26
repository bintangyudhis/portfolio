"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LANG_COOKIE, LOCALES, type Locale } from "@/lib/i18n";

const LABELS: Record<Locale, string> = { id: "ID", en: "EN", jp: "JP" };

/** Persist the choice and update <html lang> immediately (event side effects). */
function applyLocale(next: Locale) {
  document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
  try {
    localStorage.setItem(LANG_COOKIE, next);
  } catch {
    // storage unavailable: the cookie alone is enough
  }
  document.documentElement.lang = next === "jp" ? "ja" : next;
}

export default function LangToggle({
  locale,
  ariaLabel,
}: {
  locale: Locale;
  ariaLabel: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  // Optimistic display state: the pill moves the moment a language is
  // tapped, while the server re-render catches up in the background.
  // Without this the control looks dead for the whole round trip.
  const [shown, setShown] = useState<Locale>(locale);

  useEffect(() => {
    if (!isPending) setShown(locale);
  }, [locale, isPending]);

  const choose = (next: Locale) => {
    if (next === shown) return;
    setShown(next);
    applyLocale(next);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div
      className={`flex items-center gap-0.5 rounded-full border border-line bg-panel p-0.5 font-mono text-[10px] min-[360px]:text-[11px] sm:p-1 sm:text-xs ${
        isPending ? "opacity-70" : ""
      }`}
      role="group"
      aria-label={ariaLabel}
      aria-busy={isPending}
    >
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => choose(l)}
          aria-pressed={l === shown}
          className={
            l === shown
              ? "rounded-full bg-flame px-1 py-0.5 font-semibold text-on-accent min-[360px]:px-1.5 sm:px-2.5 sm:py-1"
              : "rounded-full px-1 py-0.5 text-faded transition-colors hover:text-ink min-[360px]:px-1.5 sm:px-2.5 sm:py-1"
          }
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  );
}

"use client";

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

  const choose = (next: Locale) => {
    if (next === locale) return;
    applyLocale(next);
    router.refresh();
  };

  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-line bg-panel p-1 font-mono text-xs"
      role="group"
      aria-label={ariaLabel}
    >
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => choose(l)}
          aria-pressed={l === locale}
          className={
            l === locale
              ? "rounded-full bg-flame px-2.5 py-1 font-semibold text-on-accent"
              : "rounded-full px-2.5 py-1 text-faded transition-colors hover:text-ink"
          }
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  );
}

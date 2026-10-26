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
    // storage unavailable — cookie alone is enough
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
    <div className="flex items-center gap-1 font-mono text-[13px]" role="group" aria-label={ariaLabel}>
      {LOCALES.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-line" aria-hidden>|</span>}
          <button
            type="button"
            onClick={() => choose(l)}
            aria-pressed={l === locale}
            className={
              l === locale
                ? "font-semibold text-flame underline decoration-flame underline-offset-4"
                : "text-faded transition-colors hover:text-ink"
            }
          >
            {LABELS[l]}
          </button>
        </span>
      ))}
    </div>
  );
}

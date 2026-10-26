import Link from "next/link";
import LangToggle from "./LangToggle";
import ThemeToggle from "./ThemeToggle";
import { t, type Locale } from "@/lib/i18n";

export default function SiteHeader({
  locale,
  name,
  role,
}: {
  locale: Locale;
  name: string;
  role: string;
}) {
  const links = [
    { href: "#about", label: t("navAbout", locale) },
    { href: "#experience", label: t("navExperience", locale) },
    { href: "#projects", label: t("navProjects", locale) },
    { href: "#skills", label: t("navSkills", locale) },
    { href: "#contact", label: t("navContact", locale) },
  ];

  const linkCls =
    "py-1 text-sm font-medium whitespace-nowrap text-ink/80 transition-colors hover:text-flame";

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="mx-auto w-full max-w-5xl px-5 md:px-8">
        <div className="flex items-center gap-x-5 py-3">
          <Link href="#top" className="flex min-w-0 items-baseline gap-3">
            <span className="font-display text-lg font-semibold tracking-tight whitespace-nowrap">
              {name}
            </span>
            <span className="hidden truncate text-sm text-faded xl:inline">
              {role}
            </span>
          </Link>

          <nav
            className="ml-auto hidden items-center gap-x-5 md:flex"
            aria-label="Utama"
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} className={linkCls}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-x-1.5 md:ml-0">
            <LangToggle locale={locale} ariaLabel={t("languageLabel", locale)} />
            <ThemeToggle ariaLabel={t("themeToggle", locale)} />
          </div>
        </div>

        {/* Mobile: the nav gets its own row and wraps as a container —
            each link stays on one line, nothing is cut off at 320px. */}
        <nav
          className="flex flex-wrap items-center gap-x-5 gap-y-1 pb-3 md:hidden"
          aria-label="Utama"
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} className={linkCls}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

import Link from "next/link";
import LangToggle from "./LangToggle";
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

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-2 px-5 py-3.5 md:flex-nowrap md:px-8">
        <Link href="#top" className="flex min-w-0 items-baseline gap-3">
          <span className="font-display text-lg font-semibold tracking-tight whitespace-nowrap">
            {name}
          </span>
          <span className="hidden truncate text-sm text-faded lg:inline">{role}</span>
        </Link>

        <nav className="order-3 flex w-full flex-wrap items-center gap-x-5 gap-y-1 md:order-2 md:ml-auto md:w-auto" aria-label="Utama">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="py-1 text-sm font-medium whitespace-nowrap text-ink/80 transition-colors hover:text-flame"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="order-2 ml-auto md:order-3 md:ml-0">
          <LangToggle locale={locale} ariaLabel={t("languageLabel", locale)} />
        </div>
      </div>
    </header>
  );
}

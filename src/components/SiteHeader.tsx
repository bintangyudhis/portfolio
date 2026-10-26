import Image from "next/image";
import Link from "next/link";
import LangToggle from "./LangToggle";
import LogoMark from "./Logo";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import { GithubIcon } from "./icons";
import { t, type Locale } from "@/lib/i18n";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
}

/**
 * Sticky translucent header: round avatar, logo mark, and the full-name
 * wordmark on the left; GitHub link, language control, theme toggle,
 * and (on mobile) a hamburger on the right. Desktop nav links sit in
 * the middle.
 */
export default function SiteHeader({
  locale,
  name,
  githubUrl,
  photoUrl,
}: {
  locale: Locale;
  name: string;
  role: string;
  githubUrl: string;
  photoUrl?: string;
}) {
  const links = [
    { href: "#about", label: t("navAbout", locale) },
    { href: "#experience", label: t("navExperience", locale) },
    { href: "#projects", label: t("navProjects", locale) },
    { href: "#publications", label: t("navPublications", locale) },
    { href: "#skills", label: t("navSkills", locale) },
    { href: "#contact", label: t("navContact", locale) },
  ];

  const linkCls =
    "py-1 text-[15px] font-medium whitespace-nowrap text-faded transition-colors hover:text-ink";

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="relative mx-auto w-full max-w-6xl px-3 min-[400px]:px-4 md:px-8">
        <div className="flex items-center gap-x-1.5 py-3 sm:gap-x-3">
          <Link
            href="#top"
            aria-label={name}
            className="flex shrink-0 items-center gap-1.5 min-[360px]:gap-2 sm:gap-2.5"
          >
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt=""
                width={72}
                height={72}
                className="h-8 w-8 shrink-0 rounded-full object-cover min-[360px]:h-9 min-[360px]:w-9"
              />
            ) : (
              <span
                aria-hidden
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-flame text-[11px] font-extrabold text-on-accent min-[360px]:h-9 min-[360px]:w-9 min-[360px]:text-xs"
              >
                {initials(name)}
              </span>
            )}
            <span aria-hidden className="shrink-0 text-flame">
              <LogoMark className="h-4 w-4 min-[360px]:h-5 min-[360px]:w-5" />
            </span>
            <span className="text-[10px] font-extrabold tracking-tight whitespace-nowrap min-[360px]:text-[13px] sm:text-lg lg:text-xl">
              {name}
            </span>
          </Link>

          <nav
            className="ml-8 hidden items-center gap-x-6 lg:flex"
            aria-label="Utama"
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} className={linkCls}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-x-1.5 sm:gap-x-2">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hidden h-10 w-10 shrink-0 place-items-center text-faded transition-colors hover:text-ink sm:grid"
            >
              <GithubIcon className="h-[22px] w-[22px]" />
            </a>
            <LangToggle locale={locale} ariaLabel={t("languageLabel", locale)} />
            <ThemeToggle ariaLabel={t("themeToggle", locale)} />
            <MobileMenu links={links} label="Menu" />
          </div>
        </div>
      </div>
    </header>
  );
}

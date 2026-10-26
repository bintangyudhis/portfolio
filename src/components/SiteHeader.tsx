import Image from "next/image";
import Link from "next/link";
import LangToggle from "./LangToggle";
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
 * Sticky translucent header: round avatar + lowercase wordmark on the
 * left; GitHub link, language control, theme toggle, and (on mobile) a
 * hamburger on the right. Desktop nav links sit in the middle.
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
    { href: "#skills", label: t("navSkills", locale) },
    { href: "#contact", label: t("navContact", locale) },
  ];

  const linkCls =
    "py-1 text-[15px] font-medium whitespace-nowrap text-faded transition-colors hover:text-ink";

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="relative mx-auto w-full max-w-6xl px-4 md:px-8">
        <div className="flex items-center gap-x-2 py-3 sm:gap-x-3">
          <Link href="#top" className="flex shrink-0 items-center gap-2.5">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt=""
                width={72}
                height={72}
                className="h-9 w-9 shrink-0 rounded-full object-cover"
              />
            ) : (
              <span
                aria-hidden
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-flame text-xs font-extrabold text-on-accent"
              >
                {initials(name)}
              </span>
            )}
            <span className="hidden text-xl font-extrabold tracking-tight whitespace-nowrap lowercase min-[360px]:block">
              yudhis
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

          <div className="ml-auto flex items-center gap-x-2">
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

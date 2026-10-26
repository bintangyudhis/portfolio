import LogoMark from "./Logo";
import { t, type Locale } from "@/lib/i18n";
import type { ProfileContent } from "@/lib/content";

/**
 * Footer in the v3 system, following the reference layout: a brand row
 * (mark, full name, tagline) with the channels on the right, then a
 * hairline row with the copyright and a back-to-top link.
 */
export default function SiteFooter({
  locale,
  profile,
}: {
  locale: Locale;
  profile: ProfileContent;
}) {
  const year = new Date().getFullYear();
  const channels = [
    { label: "GitHub", href: profile.githubUrl },
    { label: "LinkedIn", href: profile.linkedinUrl },
    { label: "Instagram", href: profile.instagramUrl },
    { label: "Discord", href: profile.discordUrl },
    { label: profile.email, href: `mailto:${profile.email}` },
    ...(profile.email2
      ? [{ label: profile.email2, href: `mailto:${profile.email2}` }]
      : []),
  ];

  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-5 pt-10 pb-8 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <p className="flex items-center gap-2.5">
              <LogoMark className="h-6 w-6 shrink-0 text-flame" />
              <span className="text-lg font-extrabold tracking-tight text-ink">
                {profile.name}
              </span>
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-faded">
              {t("footerTagline", locale)}
            </p>
          </div>
          <nav
            className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end"
            aria-label="Footer"
          >
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={`py-1 text-sm font-medium text-ink/80 transition-colors hover:text-flame ${
                  c.href.startsWith("mailto")
                    ? "break-all"
                    : "whitespace-nowrap"
                }`}
              >
                {c.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5">
          <p className="text-sm text-faded">
            © {year} {profile.name}
          </p>
          <a
            href="#top"
            className="text-sm whitespace-nowrap text-faded transition-colors hover:text-ink md:ml-auto"
          >
            {t("backToTop", locale)}
          </a>
        </div>
      </div>
    </footer>
  );
}

import { pick, t, type Locale } from "@/lib/i18n";
import type { ProfileContent } from "@/lib/content";

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
  ];

  return (
    <footer className="border-t border-band-line bg-band text-band-ink">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-x-8 gap-y-3 px-5 py-6 md:px-8">
        <p className="min-w-0 text-sm text-band-faded">
          © {year} {profile.name} — {t("footerTagline", locale)}
        </p>
        <nav
          className="flex flex-wrap gap-x-5 gap-y-1 md:ml-auto"
          aria-label="Footer"
        >
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className={`py-1 text-sm text-band-ink/85 transition-colors hover:text-flame ${
                c.href.startsWith("mailto")
                  ? "break-all"
                  : "whitespace-nowrap"
              }`}
            >
              {c.label}
            </a>
          ))}
        </nav>
        <a
          href="#top"
          className="text-sm whitespace-nowrap text-band-faded transition-colors hover:text-band-ink"
        >
          {t("backToTop", locale)}
        </a>
      </div>
      <span className="sr-only">{pick(profile.location, locale)}</span>
    </footer>
  );
}

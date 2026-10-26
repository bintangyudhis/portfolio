import Image from "next/image";
import { pick, t, type Locale } from "@/lib/i18n";
import type { ProfileContent } from "@/lib/content";
import {
  ArrowDownIcon,
  ArrowUpRightIcon,
  DocIcon,
  GithubIcon,
} from "./icons";

/**
 * Hero in the v3 system: role line, the name in huge heavy grotesque
 * (first word in ink, the rest in gray, a blinking accent cursor after
 * it), a gray intro, a solid primary button plus an outlined CV button
 * (only when a CV file exists), a plain GitHub link, and the photo
 * panel: a soft lavender rounded panel with the profile photo as a big
 * circle and two floating glyph chips. Without a CMS photo the circle
 * becomes an initials monogram. The photo never changes with the theme.
 */
export default function Hero({
  locale,
  profile,
}: {
  locale: Locale;
  profile: ProfileContent;
}) {
  const words = profile.name.trim().split(/\s+/);
  const head = words[0] ?? profile.name;
  const tail = words.slice(1).join(" ");
  const monogram = words
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");

  return (
    <section id="top" className="mx-auto w-full max-w-6xl px-5 md:px-8">
      <div className="grid items-center gap-12 pt-10 pb-16 md:pt-14 lg:grid-cols-12 lg:gap-10 lg:pb-24">
        <div className="min-w-0 lg:col-span-7">
          <p className="hero-in text-lg font-medium text-ink md:text-xl">
            {pick(profile.role, locale)}
          </p>
          <h1 className="hero-in mt-3 text-[clamp(2.9rem,9vw,5.6rem)] leading-[0.98] font-black tracking-[-0.02em] wrap-anywhere">
            <span className="block text-ink">{head}</span>
            {tail && (
              <span className="block text-ink">
                {tail}
                <span
                  aria-hidden
                  className="cursor-blink ml-[0.1em] inline-block h-[0.58em] w-[0.07em] bg-flame align-baseline"
                />
              </span>
            )}
          </h1>
          <p className="hero-in-late mt-6 max-w-xl text-lg leading-relaxed text-faded md:text-xl">
            {pick(profile.intro, locale)}
          </p>

          <div className="hero-in-late mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl bg-flame px-6 py-3.5 font-semibold text-on-accent transition-opacity hover:opacity-90"
            >
              {t("heroProjects", locale)}
              <ArrowDownIcon className="h-5 w-5" />
            </a>
            {profile.cvUrl && (
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-panel px-6 py-3.5 font-semibold text-ink transition-colors hover:border-flame hover:text-flame"
              >
                <DocIcon className="h-5 w-5" />
                {t("cvButton", locale)}
                <ArrowUpRightIcon className="h-4 w-4 text-faded" />
              </a>
            )}
          </div>

          <p className="hero-in-late mt-7">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-medium text-faded transition-colors hover:text-flame"
            >
              <GithubIcon className="h-5 w-5" />
              GitHub
              <ArrowUpRightIcon className="h-4 w-4" />
            </a>
          </p>
        </div>

        <div className="relative min-w-0 lg:col-span-5">
          <div
            aria-hidden
            className="chip-float absolute -top-5 left-4 z-10 rounded-xl border border-line bg-panel px-3.5 py-2.5 font-mono text-sm font-bold text-flame shadow-chip md:left-8"
          >
            {"</>"}
          </div>
          <div
            aria-hidden
            className="chip-float-late absolute top-14 -right-2 z-10 rounded-xl border border-line bg-panel px-3.5 py-2.5 font-mono text-sm font-bold text-go shadow-chip md:right-2"
          >
            {"{ }"}
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-lav px-6 pt-16 pb-10">
            {profile.photoUrl ? (
              <Image
                src={profile.photoUrl}
                alt={profile.name}
                width={560}
                height={560}
                priority
                className="mx-auto aspect-square w-56 rounded-full object-cover ring-4 ring-flame/60 md:w-72"
              />
            ) : (
              <div
                aria-hidden
                className="mx-auto grid aspect-square w-56 place-items-center rounded-full bg-flame text-6xl font-black text-on-accent ring-4 ring-flame/60 md:w-72 md:text-7xl"
              >
                {monogram}
              </div>
            )}
            <p className="mt-7 text-center font-mono text-[13px] text-faded">
              {pick(profile.location, locale)}
            </p>
            <p className="mt-1 text-center text-sm font-medium text-ink/70">
              {profile.university}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

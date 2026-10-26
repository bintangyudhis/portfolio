import Image from "next/image";
import { pick, t, type Locale } from "@/lib/i18n";
import type { ProfileContent } from "@/lib/content";

export default function Hero({
  locale,
  profile,
}: {
  locale: Locale;
  profile: ProfileContent;
}) {
  const [first, ...rest] = profile.name.split(" ");

  return (
    <section id="top" className="mx-auto max-w-6xl px-5 pt-12 pb-16 md:px-8 md:pt-16 md:pb-24">
      <p className="hero-in flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-faded">
        <span className="inline-block h-2 w-2 bg-flame" aria-hidden />
        <span>{pick(profile.location, locale)}</span>
        <span aria-hidden>—</span>
        <span>{profile.university}</span>
      </p>

      <h1 className="hero-in-late mt-6 font-display text-[clamp(3.2rem,10.5vw,7.25rem)] leading-[0.98] font-semibold tracking-[-0.015em] text-ink">
        {first}
        {rest.length > 0 && (
          <>
            <br />
            {rest.join(" ")}
          </>
        )}
      </h1>

      <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-sm font-semibold tracking-wide text-flame">
            {pick(profile.role, locale)}
          </p>
          <p className="mt-3 font-display text-2xl leading-snug font-medium text-ink md:text-[1.7rem]">
            {pick(profile.heroLine, locale)}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="bg-flame px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-paper transition-colors hover:bg-ink"
            >
              {t("heroProjects", locale)}
            </a>
            <a
              href="#contact"
              className="border border-ink px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              {t("heroContact", locale)}
            </a>
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          {profile.photoUrl && (
            <figure className="mb-8">
              <div className="border border-ink/60 p-2">
                <Image
                  src={profile.photoUrl}
                  alt={profile.name}
                  width={880}
                  height={660}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <figcaption className="mt-2 font-mono text-xs text-faded">
                {profile.name} — {pick(profile.location, locale)}
              </figcaption>
            </figure>
          )}
          <p className="max-w-prose text-base leading-relaxed text-ink/85 md:text-lg">
            {pick(profile.intro, locale)}
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
            <li>
              <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-4 transition-colors hover:text-flame hover:decoration-flame">
                GitHub
              </a>
            </li>
            <li>
              <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-4 transition-colors hover:text-flame hover:decoration-flame">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} className="underline decoration-line underline-offset-4 transition-colors hover:text-flame hover:decoration-flame">
                {profile.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

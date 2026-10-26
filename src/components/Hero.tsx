import Image from "next/image";
import { pick, type Locale } from "@/lib/i18n";
import type { ProfileContent } from "@/lib/content";

/**
 * Intro block in the aulky rhythm: modest name, role line, one short
 * paragraph, a small photo. Light mode shows the CMS profile photo;
 * the Gojo dark theme swaps it for a transparent Gojo cutout —
 * floating, never framed — in the same slot.
 */
export default function Hero({
  locale,
  profile,
}: {
  locale: Locale;
  profile: ProfileContent;
}) {
  const linkCls =
    "underline decoration-line underline-offset-4 transition-colors hover:text-flame hover:decoration-flame";

  return (
    <section
      id="top"
      className="mx-auto w-full max-w-5xl px-5 pt-12 pb-14 md:px-8 md:pt-16 md:pb-20"
    >
      <div className="flex flex-col-reverse gap-8 sm:flex-row sm:items-start sm:gap-12">
        <div className="min-w-0 flex-1">
          <h1 className="hero-in font-display text-[clamp(2.4rem,6vw,3.4rem)] leading-[1.05] font-semibold tracking-[-0.01em] text-ink wrap-anywhere">
            {profile.name}
          </h1>
          <p className="hero-in-late mt-4 text-base font-semibold text-flame">
            {pick(profile.role, locale)}
          </p>
          <p className="hero-in-late mt-4 max-w-prose text-base leading-relaxed text-ink/85 md:text-lg">
            {pick(profile.intro, locale)}
          </p>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
            <li>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkCls}
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkCls}
              >
                LinkedIn
              </a>
            </li>
            <li className="min-w-0">
              <a
                href={`mailto:${profile.email}`}
                className={`${linkCls} break-all`}
              >
                {profile.email}
              </a>
            </li>
          </ul>

          <p className="mt-9 font-mono text-[13px] text-faded">
            {pick(profile.location, locale)}
            <span aria-hidden> — </span>
            {profile.university}
          </p>
        </div>

        <div className="shrink-0">
          {profile.photoUrl && (
            <figure className="dark:hidden">
              <Image
                src={profile.photoUrl}
                alt={profile.name}
                width={352}
                height={440}
                priority
                className="aspect-[4/5] w-32 border border-line object-cover sm:w-40 md:w-44"
              />
            </figure>
          )}
          <figure className="hidden dark:block">
            <Image
              src="/gojo-cutout.png"
              alt="Gojo Satoru"
              width={349}
              height={476}
              priority
              className="aspect-[698/952] w-32 object-contain sm:w-40 md:w-44"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}

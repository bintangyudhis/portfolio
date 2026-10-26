import SectionHead from "./SectionHead";
import { pick, t, type Locale } from "@/lib/i18n";
import type { ProfileContent } from "@/lib/content";

/**
 * Background & Approach: the hero line becomes the statement heading,
 * the about text runs as plain prose, and the focus areas are a plain
 * title + one-line-description list divided by hairlines.
 */
export default function About({
  locale,
  profile,
}: {
  locale: Locale;
  profile: ProfileContent;
}) {
  const paragraphs = profile.about[locale];

  return (
    <section id="about" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto w-full max-w-5xl px-5 py-14 md:px-8 md:py-20">
        <SectionHead
          label={t("navAbout", locale)}
          title={pick(profile.heroLine, locale)}
        />

        <div className="mt-8 max-w-prose space-y-5 text-base leading-relaxed text-ink/85 md:text-lg">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <h3 className="mt-14 text-[13px] font-semibold tracking-[0.14em] text-faded uppercase">
          {t("focusTitle", locale)}
        </h3>
        <div className="mt-2">
          {profile.focus.map((f) => (
            <div
              key={f.title.id}
              className="grid gap-1 border-t border-line py-5 last:border-b sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-6"
            >
              <h4 className="font-display text-lg font-semibold text-ink">
                {pick(f.title, locale)}
              </h4>
              <p className="leading-relaxed text-ink/80">
                {pick(f.description, locale)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

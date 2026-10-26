import SectionHead from "./SectionHead";
import { pick, t, type Locale } from "@/lib/i18n";
import type { ProfileContent } from "@/lib/content";

/**
 * Background & Approach: the hero line as the statement heading, the
 * about text as plain prose, and the focus areas as three soft cards.
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
    <section id="about" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <SectionHead
          label={t("navAbout", locale)}
          title={pick(profile.heroLine, locale)}
        />

        <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-ink/80 md:text-lg">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <h3 className="mt-12 font-mono text-xs font-medium tracking-[0.18em] text-flame uppercase">
          {t("focusTitle", locale)}
        </h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {profile.focus.map((f) => (
            <div
              key={f.title.id}
              className="rounded-3xl border border-line bg-panel p-6 shadow-card"
            >
              <h4 className="text-lg font-extrabold tracking-tight text-ink">
                {pick(f.title, locale)}
              </h4>
              <p className="mt-2 leading-relaxed text-faded">
                {pick(f.description, locale)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

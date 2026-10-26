import { pick, t, type Locale } from "@/lib/i18n";
import type { ProfileContent } from "@/lib/content";

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
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-12 md:px-8 md:py-24">
        <div className="md:col-span-3">
          <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">
            {t("navAbout", locale)}
          </h2>
        </div>

        <div className="md:col-span-8 md:col-start-5">
          <div className="max-w-prose space-y-5 text-base leading-relaxed text-ink/85 md:text-lg">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <h3 className="mt-12 text-[13px] font-semibold tracking-[0.08em] text-faded uppercase">
            {t("focusTitle", locale)}
          </h3>
          <div className="mt-4">
            {profile.focus.map((f) => (
              <div
                key={f.title.id}
                className="grid gap-1 border-t border-line py-5 sm:grid-cols-[12rem_1fr] sm:gap-6"
              >
                <h4 className="font-display text-lg font-semibold text-ink">
                  {pick(f.title, locale)}
                </h4>
                <p className="leading-relaxed text-ink/80">{pick(f.description, locale)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

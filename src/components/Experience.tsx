import { pick, t, type Locale, type UiKey } from "@/lib/i18n";
import type { ExperienceItem } from "@/lib/content";

const KIND_KEY: Record<ExperienceItem["kind"], UiKey> = {
  work: "kindWork",
  organization: "kindOrganization",
  education: "kindEducation",
  "open-source": "kindOpenSource",
};

export default function Experience({
  locale,
  items,
}: {
  locale: Locale;
  items: ExperienceItem[];
}) {
  return (
    <section id="experience" className="scroll-mt-24 border-t border-line bg-panel/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-12 md:px-8 md:py-24">
        <div className="md:col-span-3">
          <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">
            {t("navExperience", locale)}
          </h2>
          <p className="mt-4 max-w-xs leading-relaxed text-faded">
            {t("experienceIntro", locale)}
          </p>
        </div>

        <div className="md:col-span-9">
          <div className="relative ml-1 border-l border-line">
            {items.map((e) => (
              <article key={e.slug} className="relative pb-12 pl-8 last:pb-0 md:pl-10">
                <span
                  className="absolute top-[7px] -left-[5px] h-[9px] w-[9px] bg-flame"
                  aria-hidden
                />
                <div className="grid gap-2 md:grid-cols-[11rem_1fr] md:gap-8">
                  <p className="font-mono text-[13px] leading-6 text-faded">
                    {pick(e.period, locale)}
                  </p>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-ink md:text-2xl">
                      {pick(e.role, locale)}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-flame">{e.org}</p>
                    <p className="mt-1 text-xs font-semibold tracking-[0.08em] text-faded uppercase">
                      {t(KIND_KEY[e.kind], locale)}
                    </p>
                    <p className="mt-3 max-w-prose leading-relaxed text-ink/80">
                      {pick(e.description, locale)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

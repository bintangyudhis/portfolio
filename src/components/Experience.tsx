import SectionHead from "./SectionHead";
import { pick, t, type Locale, type UiKey } from "@/lib/i18n";
import type { ExperienceItem } from "@/lib/content";

const KIND_KEY: Record<ExperienceItem["kind"], UiKey> = {
  work: "kindWork",
  organization: "kindOrganization",
  education: "kindEducation",
  "open-source": "kindOpenSource",
};

/**
 * Curriculum Vitae — work, organizations, and open source as full plain
 * entries: period on the left, role heading, org + kind, description.
 * Education entries live in their own section (see Education.tsx).
 */
export default function Experience({
  locale,
  items,
}: {
  locale: Locale;
  items: ExperienceItem[];
}) {
  const cvItems = items.filter((e) => e.kind !== "education");

  return (
    <section
      id="experience"
      className="scroll-mt-24 border-t border-line bg-panel/50"
    >
      <div className="mx-auto w-full max-w-5xl px-5 py-14 md:px-8 md:py-20">
        <SectionHead
          label={t("cvLabel", locale)}
          title={t("cvTitle", locale)}
          intro={t("experienceIntro", locale)}
        />

        <div className="mt-10">
          {cvItems.map((e) => (
            <article
              key={e.slug}
              className="grid gap-2 border-t border-line py-7 first:border-t-0 first:pt-0 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-8"
            >
              <p className="font-mono text-[13px] leading-6 text-faded">
                {pick(e.period, locale)}
              </p>
              <div className="min-w-0">
                <h3 className="font-display text-xl font-semibold text-ink wrap-anywhere md:text-2xl">
                  {pick(e.role, locale)}
                </h3>
                <p className="mt-1 text-sm">
                  <span className="font-semibold text-flame">{e.org}</span>
                  <span className="text-faded">
                    {" · "}
                    {t(KIND_KEY[e.kind], locale)}
                  </span>
                </p>
                <p className="mt-3 max-w-prose leading-relaxed text-ink/80">
                  {pick(e.description, locale)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

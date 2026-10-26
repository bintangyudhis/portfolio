import SectionHead from "./SectionHead";
import ExperienceCard from "./ExperienceCard";
import { t, type Locale } from "@/lib/i18n";
import type { ExperienceItem } from "@/lib/content";

/**
 * Curriculum Vitae: work, organizations, and open source as big rounded
 * cards. Education entries live in their own section (see Education.tsx).
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
    <section id="experience" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <SectionHead
          label={t("cvLabel", locale)}
          title={t("cvTitle", locale)}
          intro={t("experienceIntro", locale)}
        />
        <div className="mt-10 space-y-6">
          {cvItems.map((e) => (
            <ExperienceCard key={e.slug} locale={locale} item={e} />
          ))}
        </div>
      </div>
    </section>
  );
}

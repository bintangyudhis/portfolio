import SectionHead from "./SectionHead";
import { pick, t, type Locale, type UiKey } from "@/lib/i18n";
import type { SkillGroup, SkillLevel } from "@/lib/content";

const LEVEL_KEY: Record<SkillLevel, UiKey> = {
  advanced: "levelAdvanced",
  proficient: "levelProficient",
  exploring: "levelExploring",
};

/**
 * Technical skills: groups with a short description, each skill listed
 * with its level as a word. Certifications and spoken languages live in
 * the Education section.
 */
export default function Skills({
  locale,
  groups,
}: {
  locale: Locale;
  groups: SkillGroup[];
}) {
  return (
    <section id="skills" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto w-full max-w-5xl px-5 py-14 md:px-8 md:py-20">
        <SectionHead
          label={t("technicalLabel", locale)}
          title={t("navSkills", locale)}
          intro={t("skillsIntro", locale)}
        />

        <div className="mt-10">
          {groups.map((g) => (
            <div
              key={g.slug}
              className="grid gap-3 border-t border-line py-7 first:border-t-0 first:pt-0 md:grid-cols-12 md:gap-6"
            >
              <div className="min-w-0 md:col-span-5">
                <h3 className="font-display text-xl font-semibold text-ink">
                  {pick(g.name, locale)}
                </h3>
                <p className="mt-1.5 leading-relaxed text-faded">
                  {pick(g.blurb, locale)}
                </p>
              </div>
              <ul className="min-w-0 md:col-span-7">
                {g.skills.map((s) => (
                  <li
                    key={s.name}
                    className="flex items-baseline justify-between gap-4 border-b border-line/70 py-2.5 last:border-b-0"
                  >
                    <span className="min-w-0 font-medium text-ink wrap-anywhere">
                      {s.name}
                    </span>
                    <span
                      className={`font-mono text-[13px] whitespace-nowrap ${
                        s.level === "advanced" ? "text-flame" : "text-faded"
                      }`}
                    >
                      {t(LEVEL_KEY[s.level], locale)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

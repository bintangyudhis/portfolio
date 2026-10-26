import SectionHead from "./SectionHead";
import { pick, t, type Locale, type UiKey } from "@/lib/i18n";
import type { SkillGroup, SkillLevel } from "@/lib/content";

const LEVEL_KEY: Record<SkillLevel, UiKey> = {
  advanced: "levelAdvanced",
  proficient: "levelProficient",
  exploring: "levelExploring",
};

/**
 * Technical skills as cards: one per group, with a short description
 * and each skill's level written as a word. Certifications and spoken
 * languages live in the Education section.
 */
export default function Skills({
  locale,
  groups,
}: {
  locale: Locale;
  groups: SkillGroup[];
}) {
  return (
    <section id="skills" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <SectionHead
          label={t("technicalLabel", locale)}
          title={t("navSkills", locale)}
          intro={t("skillsIntro", locale)}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {groups.map((g) => (
            <div
              key={g.slug}
              className="rounded-3xl border border-line bg-panel p-6 shadow-card md:p-7"
            >
              <h3 className="text-xl font-extrabold tracking-tight text-ink">
                {pick(g.name, locale)}
              </h3>
              <p className="mt-1.5 leading-relaxed text-faded">
                {pick(g.blurb, locale)}
              </p>
              <ul className="mt-4 divide-y divide-line">
                {g.skills.map((s) => (
                  <li
                    key={s.name}
                    className="flex items-baseline justify-between gap-4 py-2.5"
                  >
                    <span className="min-w-0 font-medium text-ink wrap-anywhere">
                      {s.name}
                    </span>
                    <span
                      className={`font-mono text-[13px] whitespace-nowrap ${
                        s.level === "advanced"
                          ? "font-semibold text-flame"
                          : "text-faded"
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

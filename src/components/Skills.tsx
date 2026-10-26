import { pick, t, type Locale, type UiKey } from "@/lib/i18n";
import type {
  CertificationItem,
  LanguageItem,
  SkillGroup,
  SkillLevel,
} from "@/lib/content";

const LEVEL_KEY: Record<SkillLevel, UiKey> = {
  advanced: "levelAdvanced",
  proficient: "levelProficient",
  exploring: "levelExploring",
};

export default function Skills({
  locale,
  groups,
  certifications,
  languages,
}: {
  locale: Locale;
  groups: SkillGroup[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
}) {
  return (
    <section id="skills" className="scroll-mt-24 border-t border-line bg-panel/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-12 md:px-8 md:py-24">
        <div className="md:col-span-3">
          <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">
            {t("navSkills", locale)}
          </h2>
          <p className="mt-4 max-w-xs leading-relaxed text-faded">{t("skillsIntro", locale)}</p>
        </div>

        <div className="md:col-span-9">
          {groups.map((g) => (
            <div
              key={g.slug}
              className="grid gap-3 border-t border-line py-7 first:border-t-0 first:pt-0 md:grid-cols-12 md:gap-6"
            >
              <div className="md:col-span-5">
                <h3 className="font-display text-xl font-semibold text-ink">
                  {pick(g.name, locale)}
                </h3>
                <p className="mt-1.5 leading-relaxed text-faded">{pick(g.blurb, locale)}</p>
              </div>
              <ul className="md:col-span-7">
                {g.skills.map((s) => (
                  <li
                    key={s.name}
                    className="flex items-baseline justify-between gap-4 border-b border-line/70 py-2.5 last:border-b-0"
                  >
                    <span className="font-medium text-ink">{s.name}</span>
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

          {certifications.length > 0 && (
            <div className="grid gap-3 border-t border-line py-7 md:grid-cols-12 md:gap-6">
              <div className="md:col-span-5">
                <h3 className="font-display text-xl font-semibold text-ink">
                  {t("certificationsTitle", locale)}
                </h3>
              </div>
              <ul className="md:col-span-7">
                {certifications.map((cert) => (
                  <li
                    key={cert.slug}
                    className="flex items-baseline justify-between gap-4 border-b border-line/70 py-2.5 last:border-b-0"
                  >
                    <span>
                      <span className="font-medium text-ink">{cert.title}</span>
                      {cert.credentialId && (
                        <span className="mt-0.5 block font-mono text-xs text-faded">
                          {t("credentialIdLabel", locale)}: {cert.credentialId}
                        </span>
                      )}
                    </span>
                    <span className="font-mono text-[13px] whitespace-nowrap text-faded">
                      {cert.issuer} · {pick(cert.issued, locale)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {languages.length > 0 && (
            <div className="grid gap-3 border-t border-line py-7 md:grid-cols-12 md:gap-6">
              <div className="md:col-span-5">
                <h3 className="font-display text-xl font-semibold text-ink">
                  {t("languageLabel", locale)}
                </h3>
              </div>
              <ul className="md:col-span-7">
                {languages.map((lang) => (
                  <li
                    key={lang.name.en}
                    className="flex items-baseline justify-between gap-4 border-b border-line/70 py-2.5 last:border-b-0"
                  >
                    <span className="font-medium text-ink">{pick(lang.name, locale)}</span>
                    <span className="font-mono text-[13px] whitespace-nowrap text-faded">
                      {pick(lang.level, locale)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

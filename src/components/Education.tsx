import SectionHead from "./SectionHead";
import ExperienceCard from "./ExperienceCard";
import { pick, t, type Locale } from "@/lib/i18n";
import type {
  CertificationItem,
  ExperienceItem,
  LanguageItem,
} from "@/lib/content";

/**
 * Education & Certifications: education entries reuse the big experience
 * card; certifications and spoken languages become row cards.
 */
export default function Education({
  locale,
  items,
  certifications,
  languages,
}: {
  locale: Locale;
  items: ExperienceItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
}) {
  const education = items.filter((e) => e.kind === "education");

  return (
    <section id="education" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <SectionHead
          label={t("kindEducation", locale)}
          title={t("educationTitle", locale)}
        />

        <div className="mt-10 space-y-6">
          {education.map((e) => (
            <ExperienceCard key={e.slug} locale={locale} item={e} />
          ))}

          {certifications.length > 0 && (
            <div className="rounded-3xl border border-line bg-panel p-6 shadow-card md:p-8">
              <h3 className="text-xl font-extrabold tracking-tight text-ink">
                {t("certificationsTitle", locale)}
              </h3>
              <ul className="mt-3 divide-y divide-line">
                {certifications.map((cert) => (
                  <li
                    key={cert.slug}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4"
                  >
                    <span className="min-w-0">
                      <span className="font-semibold text-ink">{cert.title}</span>
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
            <div className="rounded-3xl border border-line bg-panel p-6 shadow-card md:p-8">
              <h3 className="text-xl font-extrabold tracking-tight text-ink">
                {t("languageLabel", locale)}
              </h3>
              <ul className="mt-3 divide-y divide-line">
                {languages.map((lang) => (
                  <li
                    key={lang.name.en}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4"
                  >
                    <span className="font-semibold text-ink">
                      {pick(lang.name, locale)}
                    </span>
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

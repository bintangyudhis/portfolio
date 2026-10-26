import SectionHead from "./SectionHead";
import { pick, t, type Locale } from "@/lib/i18n";
import type {
  CertificationItem,
  ExperienceItem,
  LanguageItem,
} from "@/lib/content";

/**
 * Education & Certifications: the education-kind CV entries, then the
 * certification list and spoken languages as plain hairline rows.
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
    <section id="education" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto w-full max-w-5xl px-5 py-14 md:px-8 md:py-20">
        <SectionHead
          label={t("kindEducation", locale)}
          title={t("educationTitle", locale)}
        />

        <div className="mt-10">
          {education.map((e) => (
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
                <p className="mt-1 text-sm font-semibold text-flame">{e.org}</p>
                <p className="mt-3 max-w-prose leading-relaxed text-ink/80">
                  {pick(e.description, locale)}
                </p>
              </div>
            </article>
          ))}
        </div>

        {certifications.length > 0 && (
          <>
            <h3 className="mt-12 text-[13px] font-semibold tracking-[0.14em] text-faded uppercase">
              {t("certificationsTitle", locale)}
            </h3>
            <ul className="mt-2">
              {certifications.map((cert) => (
                <li
                  key={cert.slug}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-line py-4 last:border-b"
                >
                  <span className="min-w-0">
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
          </>
        )}

        {languages.length > 0 && (
          <>
            <h3 className="mt-12 text-[13px] font-semibold tracking-[0.14em] text-faded uppercase">
              {t("languageLabel", locale)}
            </h3>
            <ul className="mt-2">
              {languages.map((lang) => (
                <li
                  key={lang.name.en}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-line py-4 last:border-b"
                >
                  <span className="font-medium text-ink">
                    {pick(lang.name, locale)}
                  </span>
                  <span className="font-mono text-[13px] whitespace-nowrap text-faded">
                    {pick(lang.level, locale)}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}

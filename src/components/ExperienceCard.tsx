import { pick, t, type Locale, type UiKey } from "@/lib/i18n";
import type { ExperienceItem } from "@/lib/content";
import { BuildingIcon, CalendarIcon, CheckCircleIcon } from "./icons";

const KIND_KEY: Record<ExperienceItem["kind"], UiKey> = {
  work: "kindWork",
  organization: "kindOrganization",
  education: "kindEducation",
  "open-source": "kindOpenSource",
};

/**
 * Split a description into sentences without inventing anything: the
 * panel shows the entry's own sentences as a checklist when there are
 * two or more, and as a plain paragraph when there is only one.
 * Japanese splits on the full stop; the other locales on ". " style
 * boundaries so tokens like "Node.js" stay intact.
 */
function splitSentences(text: string, locale: Locale): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  if (locale === "jp") {
    return trimmed
      .split(/(?<=。)/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return trimmed
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * One CV entry as a big rounded card: heavy title, kind as a mono pill,
 * icon meta rows, an inner inset panel with the highlights, and mono
 * tech pills where the entry itself names its tools.
 */
export default function ExperienceCard({
  locale,
  item,
}: {
  locale: Locale;
  item: ExperienceItem;
}) {
  const description = pick(item.description, locale);
  const sentences = splitSentences(description, locale);

  return (
    <article className="rounded-3xl border border-line bg-panel p-6 shadow-card md:p-8">
      <h3 className="text-[1.55rem] leading-tight font-extrabold tracking-tight text-ink wrap-anywhere md:text-[1.8rem]">
        {pick(item.role, locale)}
      </h3>

      <p className="mt-3.5">
        <span className="inline-flex rounded-full border border-line bg-inset px-3 py-1 font-mono text-xs text-faded">
          {t(KIND_KEY[item.kind], locale)}
        </span>
      </p>

      <div className="mt-4 space-y-1.5 font-mono text-sm text-faded">
        <p className="flex items-center gap-2.5">
          <BuildingIcon className="h-[18px] w-[18px] shrink-0" />
          <span className="min-w-0 wrap-anywhere">{item.org}</span>
        </p>
        <p className="flex items-center gap-2.5">
          <CalendarIcon className="h-[18px] w-[18px] shrink-0" />
          <span className="min-w-0 wrap-anywhere">{pick(item.period, locale)}</span>
        </p>
      </div>

      <div className="mt-6 rounded-2xl bg-inset p-5 md:p-6">
        <h4 className="text-[13px] font-extrabold tracking-[0.08em] text-ink uppercase">
          {t("highlightsTitle", locale)}:
        </h4>
        {sentences.length >= 2 ? (
          <ul className="mt-4 space-y-3.5">
            {sentences.map((s, i) => (
              <li key={i} className="flex gap-3">
                <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-flame" />
                <span className="min-w-0 leading-relaxed text-ink/80">{s}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3.5 leading-relaxed text-ink/80">{description}</p>
        )}
      </div>

      {item.tech && item.tech.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-2">
          {item.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-line bg-inset px-3.5 py-1.5 font-mono text-[13px] text-ink/75"
            >
              {tech}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

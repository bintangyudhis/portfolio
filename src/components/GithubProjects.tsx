import SectionHead from "./SectionHead";
import { StarIcon } from "./icons";
import { pick, t, type Locale } from "@/lib/i18n";
import type { ProjectItem } from "@/lib/content";
import type { GithubData } from "@/lib/github";

const DATE_LOCALE: Record<Locale, string> = {
  id: "id-ID",
  en: "en-US",
  jp: "ja-JP",
};

function formatDate(iso: string, locale: Locale): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat(DATE_LOCALE[locale], {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

/**
 * Every public GitHub repo as rows inside one big rounded container:
 * bold name, gray description, mono meta (language, stars, updated).
 * When the GitHub API is unreachable the CMS project list takes over
 * so the section is never empty.
 */
export default function GithubProjects({
  locale,
  data,
  fallbackProjects,
}: {
  locale: Locale;
  data: GithubData;
  fallbackProjects: ProjectItem[];
}) {
  return (
    <section id="github-projects" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <SectionHead
          label={t("githubLabel", locale)}
          title={t("githubProjectsTitle", locale)}
          intro={t("githubProjectsIntro", locale)}
        />

        <div className="mt-10 overflow-hidden rounded-3xl border border-line bg-panel shadow-card">
          {data.repos ? (
            <ul className="divide-y divide-line">
              {data.repos.map((r) => (
                <li
                  key={r.name}
                  className="flex flex-col gap-1.5 px-6 py-5 md:px-8 sm:flex-row sm:items-baseline sm:gap-6"
                >
                  <div className="min-w-0 flex-1">
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-bold text-ink transition-colors wrap-anywhere hover:text-flame"
                    >
                      {r.name}
                    </a>
                    {r.description && (
                      <p className="mt-1 leading-relaxed text-faded">
                        {r.description}
                      </p>
                    )}
                  </div>
                  <p className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs whitespace-nowrap text-faded">
                    {r.language && <span>{r.language}</span>}
                    <span className="inline-flex items-center gap-1.5">
                      <StarIcon />
                      {r.stars}
                    </span>
                    <span>{formatDate(r.updatedAt, locale)}</span>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="divide-y divide-line">
              {fallbackProjects.map((p) => (
                <li
                  key={p.slug}
                  className="flex flex-col gap-1.5 px-6 py-5 md:px-8 sm:flex-row sm:items-baseline sm:gap-6"
                >
                  <div className="min-w-0 flex-1">
                    {p.repoUrl || p.liveUrl ? (
                      <a
                        href={p.repoUrl ?? p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-bold text-ink transition-colors wrap-anywhere hover:text-flame"
                      >
                        {p.title}
                      </a>
                    ) : (
                      <span className="text-lg font-bold text-ink">{p.title}</span>
                    )}
                    <p className="mt-1 leading-relaxed text-faded">
                      {pick(p.description, locale)}
                    </p>
                    {p.tech.length > 0 && (
                      <p className="mt-1.5 font-mono text-xs text-faded">
                        {p.tech.join(" · ")}
                      </p>
                    )}
                  </div>
                  <p className="shrink-0 font-mono text-xs whitespace-nowrap text-faded">
                    {p.year}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

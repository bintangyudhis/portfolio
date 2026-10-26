import SectionHead from "./SectionHead";
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
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat(DATE_LOCALE[locale], {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

function StarIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 text-highlight"
      viewBox="0 0 576 512"
      fill="currentColor"
      aria-hidden
    >
      <path d="M316 21l-45.6 92.4-101.9 14.8c-14.8 2.2-20.7 20.2-9.4 28.9l73.7 71.9-17.4 101.5c-2.5 14.7 12.9 25.9 26.4 19.3L288 357.4l91.2 47.9c13.4 7.1 28.9-4.5 26.4-19.3l-17.4-101.5 73.7-71.9c11.3-11 5.2-26.7-9.4-28.9l-101.9-14.8L332 21c-6.5-13.2-25.5-13.2-32 0z" />
    </svg>
  );
}

/**
 * Every public GitHub repo as plain hairline rows — name, description,
 * language, stars, last-updated date. When the GitHub API is unreachable
 * the CMS project list takes over so the section is never empty.
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
    <section
      id="github-projects"
      className="scroll-mt-24 border-t border-line bg-panel/50"
    >
      <div className="mx-auto w-full max-w-5xl px-5 py-14 md:px-8 md:py-20">
        <SectionHead
          label={t("githubLabel", locale)}
          title={t("githubProjectsTitle", locale)}
          intro={t("githubProjectsIntro", locale)}
        />

        {data.repos ? (
          <ul className="mt-8">
            {data.repos.map((r) => (
              <li
                key={r.name}
                className="border-t border-line py-5 first:border-t-0 first:pt-0 last:pb-0"
              >
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-xl font-semibold text-ink underline decoration-line underline-offset-4 transition-colors wrap-anywhere hover:text-flame hover:decoration-flame"
                  >
                    {r.name}
                  </a>
                  <span className="ml-auto font-mono text-[13px] whitespace-nowrap text-faded">
                    {formatDate(r.updatedAt, locale)}
                  </span>
                </div>
                <p className="mt-1.5 max-w-prose leading-relaxed text-ink/80">
                  {r.description ?? "—"}
                </p>
                <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[13px] text-faded">
                  {r.language && <span>{r.language}</span>}
                  <span className="inline-flex items-center gap-1.5">
                    <StarIcon />
                    {r.stars}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-8">
            {fallbackProjects.map((p) => (
              <li
                key={p.slug}
                className="border-t border-line py-5 first:border-t-0 first:pt-0 last:pb-0"
              >
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  {p.repoUrl || p.liveUrl ? (
                    <a
                      href={p.repoUrl ?? p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display text-xl font-semibold text-ink underline decoration-line underline-offset-4 transition-colors wrap-anywhere hover:text-flame hover:decoration-flame"
                    >
                      {p.title}
                    </a>
                  ) : (
                    <span className="font-display text-xl font-semibold text-ink">
                      {p.title}
                    </span>
                  )}
                  <span className="ml-auto font-mono text-[13px] whitespace-nowrap text-faded">
                    {p.year}
                  </span>
                </div>
                <p className="mt-1.5 max-w-prose leading-relaxed text-ink/80">
                  {pick(p.description, locale)}
                </p>
                <p className="mt-2 font-mono text-[13px] text-faded">
                  {p.tech.join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

import Image from "next/image";
import SectionHead from "./SectionHead";
import { ArrowUpRightIcon } from "./icons";
import { pick, t, type Locale } from "@/lib/i18n";
import type { ProjectItem } from "@/lib/content";

/**
 * Featured CMS projects as rounded cards in a two-column grid: optional
 * image, heavy title, gray description, mono tech pills, and plain
 * code/live links. The heading carries the "view all (N)" link down to
 * the full GitHub list.
 */
export default function Projects({
  locale,
  projects,
  viewAllCount,
}: {
  locale: Locale;
  projects: ProjectItem[];
  viewAllCount: number;
}) {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <SectionHead
          label={t("portfolioLabel", locale)}
          title={t("featuredTitle", locale)}
          intro={t("projectsIntro", locale)}
          action={
            <a
              href="#github-projects"
              className="inline-flex shrink-0 items-center gap-1.5 font-mono text-sm font-semibold whitespace-nowrap text-flame transition-opacity hover:opacity-80"
            >
              {t("viewAll", locale)} ({viewAllCount})
              <ArrowUpRightIcon className="h-4 w-4 rotate-90" />
            </a>
          }
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {featured.map((p) => (
            <article
              key={p.slug}
              className="flex flex-col rounded-3xl border border-line bg-panel p-6 shadow-card md:p-7"
            >
              {p.imageUrl && (
                <Image
                  src={p.imageUrl}
                  alt={p.title}
                  width={640}
                  height={400}
                  className="mb-5 aspect-[16/10] w-full rounded-2xl border border-line object-cover"
                />
              )}
              <p className="font-mono text-xs text-faded">{p.year}</p>
              <h3 className="mt-2 text-[1.45rem] leading-tight font-extrabold tracking-tight text-ink wrap-anywhere">
                {p.title}
              </h3>
              <p className="mt-2.5 flex-1 leading-relaxed text-faded">
                {pick(p.description, locale)}
              </p>

              {p.tech.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.tech.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-line bg-inset px-3.5 py-1.5 font-mono text-[13px] text-ink/75"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              )}

              {(p.repoUrl || p.liveUrl) && (
                <p className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-sm font-semibold">
                  {p.repoUrl && (
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-ink transition-colors hover:text-flame"
                    >
                      {t("codeLink", locale)}
                      <ArrowUpRightIcon className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-flame transition-opacity hover:opacity-80"
                    >
                      {t("liveLink", locale)}
                      <ArrowUpRightIcon className="h-3.5 w-3.5" />
                    </a>
                  )}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

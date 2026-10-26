import Image from "next/image";
import SectionHead from "./SectionHead";
import { pick, t, type Locale } from "@/lib/i18n";
import type { ProjectItem } from "@/lib/content";

const num = (n: number) => String(n).padStart(2, "0");

function ProjectLinks({
  locale,
  project,
}: {
  locale: Locale;
  project: ProjectItem;
}) {
  return (
    <p className="flex flex-wrap gap-x-5 gap-y-1 text-sm font-semibold">
      {project.repoUrl && (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-line underline-offset-4 transition-colors hover:text-flame hover:decoration-flame"
        >
          {t("codeLink", locale)}
        </a>
      )}
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-flame underline decoration-flame/40 underline-offset-4 transition-colors hover:decoration-flame"
        >
          {t("liveLink", locale)}
        </a>
      )}
    </p>
  );
}

/**
 * Portfolio: the featured CMS projects as numbered plain rows, then a
 * single "View All (N)" link down to the full GitHub list below.
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
  const indexOf = (p: ProjectItem) => projects.indexOf(p) + 1;

  return (
    <section id="projects" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto w-full max-w-5xl px-5 py-14 md:px-8 md:py-20">
        <SectionHead
          label={t("portfolioLabel", locale)}
          title={t("featuredTitle", locale)}
          intro={t("projectsIntro", locale)}
        />

        <div className="mt-10">
          {featured.map((p) => (
            <article
              key={p.slug}
              className="grid gap-4 border-t border-line py-8 first:border-t-0 first:pt-0 md:grid-cols-12 md:gap-6"
            >
              <p className="font-mono text-sm text-faded md:col-span-1">
                {num(indexOf(p))}
              </p>
              <div className="min-w-0 md:col-span-7">
                <h3 className="font-display text-2xl font-semibold text-ink wrap-anywhere md:text-[2rem] md:leading-tight">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-prose leading-relaxed text-ink/80">
                  {pick(p.description, locale)}
                </p>
                <div className="mt-4">
                  <ProjectLinks locale={locale} project={p} />
                </div>
              </div>
              <div className="min-w-0 md:col-span-4">
                {p.imageUrl && (
                  <Image
                    src={p.imageUrl}
                    alt={p.title}
                    width={640}
                    height={400}
                    className="mb-4 aspect-[16/10] w-full border border-line object-cover"
                  />
                )}
                <div className="font-mono text-[13px] leading-6 text-faded md:text-right">
                  <p className="text-ink">{p.year}</p>
                  <p>{p.tech.join(" · ")}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-4 border-t border-line pt-6 text-base">
          <a
            href="#github-projects"
            className="font-semibold text-ink underline decoration-flame underline-offset-4 transition-colors hover:text-flame"
          >
            {t("viewAll", locale)} ({viewAllCount})
          </a>
        </p>
      </div>
    </section>
  );
}

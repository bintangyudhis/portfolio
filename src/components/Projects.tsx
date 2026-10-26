import Image from "next/image";
import { pick, t, type Locale } from "@/lib/i18n";
import type { ProjectItem } from "@/lib/content";

const num = (n: number) => String(n).padStart(2, "0");

function ProjectLinks({ locale, project }: { locale: Locale; project: ProjectItem }) {
  return (
    <p className="flex flex-wrap gap-x-5 gap-y-1 text-sm font-semibold">
      {project.repoUrl && (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-line underline-offset-4 transition-colors hover:text-flame hover:decoration-flame"
        >
          {t("codeLink", locale)} ↗
        </a>
      )}
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-flame underline decoration-flame/40 underline-offset-4 transition-colors hover:decoration-flame"
        >
          {t("liveLink", locale)} ↗
        </a>
      )}
    </p>
  );
}

export default function Projects({
  locale,
  projects,
}: {
  locale: Locale;
  projects: ProjectItem[];
}) {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const indexOf = (p: ProjectItem) => projects.indexOf(p) + 1;

  return (
    <section id="projects" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">
            {t("navProjects", locale)}
          </h2>
          <p className="max-w-md leading-relaxed text-faded">{t("projectsIntro", locale)}</p>
        </div>

        <p className="mt-12 text-[13px] font-semibold tracking-[0.08em] text-faded uppercase">
          {t("projectFeatured", locale)}
        </p>
        <div>
          {featured.map((p) => (
            <article
              key={p.slug}
              className="grid gap-4 border-t border-line py-8 md:grid-cols-12 md:gap-6 md:py-10"
            >
              <p className="font-mono text-sm text-faded md:col-span-1">{num(indexOf(p))}</p>
              <div className="md:col-span-7">
                <h3 className="font-display text-2xl font-semibold text-ink md:text-[2rem] md:leading-tight">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-prose leading-relaxed text-ink/80">
                  {pick(p.description, locale)}
                </p>
                <div className="mt-4">
                  <ProjectLinks locale={locale} project={p} />
                </div>
              </div>
              <div className="md:col-span-4">
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

        <p className="mt-10 text-[13px] font-semibold tracking-[0.08em] text-faded uppercase">
          {t("projectAll", locale)}
        </p>
        <div className="grid gap-x-12 md:grid-cols-2">
          {rest.map((p) => (
            <article key={p.slug} className="border-t border-line py-6">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[13px] text-faded">{num(indexOf(p))}</span>
                <h3 className="font-display text-xl font-semibold text-ink">{p.title}</h3>
                <span className="ml-auto font-mono text-[13px] text-faded">{p.year}</span>
              </div>
              <p className="mt-2 pl-9 leading-relaxed text-ink/80">
                {pick(p.description, locale)}
              </p>
              {p.imageUrl && (
                <div className="mt-3 pl-9">
                  <Image
                    src={p.imageUrl}
                    alt={p.title}
                    width={640}
                    height={360}
                    className="aspect-[16/9] w-full max-w-md border border-line object-cover"
                  />
                </div>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 pl-9">
                <span className="font-mono text-xs text-faded">{p.tech.join(" · ")}</span>
                <ProjectLinks locale={locale} project={p} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

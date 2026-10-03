import { getProjects } from "@/lib/store";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Projects — Bintang Yudhistira",
  description: "All projects built by Bintang Yudhistira.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section className="pt-32 pb-20 md:pt-40">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent-400">
            Portfolio
          </p>
          <h1 className="font-display text-4xl font-bold text-white md:text-5xl">
            All <span className="text-gradient">Projects</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Everything I&apos;ve built and shipped — web apps, mobile apps, APIs,
            and experiments.
          </p>
        </Reveal>

        {featured.length > 0 && (
          <>
            <Reveal>
              <h2 className="font-display mb-6 text-xl font-bold text-white">
                Featured
              </h2>
            </Reveal>
            <div className="mb-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((p, i) => (
                <Reveal key={p.id} delay={i * 80}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          </>
        )}

        {rest.length > 0 && (
          <>
            <Reveal>
              <h2 className="font-display mb-6 text-xl font-bold text-white">
                More Projects
              </h2>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((p, i) => (
                <Reveal key={p.id} delay={i * 60}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

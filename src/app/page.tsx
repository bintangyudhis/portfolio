import Link from "next/link";
import { getExperience, getProjects } from "@/lib/store";
import { profile } from "@/lib/seed";
import Reveal from "@/components/Reveal";
import Typewriter from "@/components/Typewriter";
import ProjectCard from "@/components/ProjectCard";

export const dynamic = "force-dynamic";

function SectionTitle({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: string;
  sub?: string;
}) {
  return (
    <Reveal className="mb-10 text-center">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent-400">
        {kicker}
      </p>
      <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
        {title}
      </h2>
      {sub && <p className="mx-auto mt-3 max-w-2xl text-slate-400">{sub}</p>}
    </Reveal>
  );
}

export default async function Home() {
  const projects = await getProjects();
  const experience = await getExperience();
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const categories = [...new Set(profile.skills.map((s) => s.category))];

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-blob absolute -top-20 -left-20 h-96 w-96 rounded-full bg-accent-600/25 blur-[120px]" />
          <div className="animate-blob absolute top-40 right-0 h-80 w-80 rounded-full bg-mint-400/15 blur-[120px]" style={{ animationDelay: "-6s" }} />
        </div>

        <div className="relative mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-mint-400" />
              {profile.university}
            </p>
            <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-7xl">
              Hi, I&apos;m{" "}
              <span className="text-gradient">{profile.name}</span>
            </h1>
            <p className="font-display mt-5 text-2xl text-slate-300 md:text-3xl">
              <Typewriter words={profile.roles} />
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
              {profile.about.split(".")[0]}.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="rounded-xl bg-accent-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent-600/30 transition hover:-translate-y-0.5 hover:bg-accent-500"
              >
                View My Work
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Get In Touch
              </Link>
            </div>

            <div className="mt-12 grid max-w-xl grid-cols-3 gap-4">
              {[
                { n: `${projects.length}+`, l: "Projects Built" },
                { n: "6+", l: "Technologies" },
                { n: "2023", l: "Coding Since" },
              ].map((s) => (
                <div key={s.l} className="glass rounded-2xl p-4 text-center">
                  <p className="font-display text-2xl font-bold text-white md:text-3xl">
                    {s.n}
                  </p>
                  <p className="mt-1 text-xs text-slate-400 md:text-sm">{s.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ SKILLS ============ */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle
            kicker="Skills"
            title="What I Work With"
            sub="A mix of battle-tested tools I use daily and new fields I'm actively exploring."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <Reveal key={cat} delay={i * 80}>
                <div className="glass h-full rounded-2xl p-6">
                  <h3 className="font-display mb-4 text-lg font-bold text-white">
                    {cat}
                  </h3>
                  <div className="space-y-4">
                    {profile.skills
                      .filter((s) => s.category === cat)
                      .map((s) => (
                        <div key={s.name}>
                          <div className="mb-1.5 flex justify-between text-sm">
                            <span className="text-slate-300">{s.name}</span>
                            <span className="text-slate-500">{s.level}%</span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-accent-500 to-mint-400"
                              style={{ width: `${s.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED PROJECTS ============ */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle
            kicker="Portfolio"
            title="Featured Projects"
            sub="A selection of things I've built — from SaaS platforms to mobile apps."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              See all projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============ EXPERIENCE TEASER ============ */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-5">
          <SectionTitle kicker="Journey" title="Experience & Education" />
          <div className="relative space-y-6 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-white/10">
            {experience.slice(0, 3).map((e, i) => (
              <Reveal key={e.id} delay={i * 100}>
                <div className="relative pl-10">
                  <span className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-accent-400 bg-ink-950" />
                  <div className="glass rounded-2xl p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-display font-bold text-white">{e.role}</h3>
                      <span className="text-xs text-slate-500">
                        {e.startDate} — {e.endDate}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-accent-300">
                      {e.organization}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {e.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <Link
              href="/experience"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Full timeline
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-5">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-accent-500/20 bg-gradient-to-br from-accent-600/20 via-ink-800 to-ink-900 p-10 text-center md:p-14">
              <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent-600/30 blur-[100px]" />
              <h2 className="font-display relative text-3xl font-bold text-white md:text-4xl">
                Have a project in mind?
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-slate-400">
                I&apos;m always open to interesting projects, collaborations, or
                just a good tech conversation. Let&apos;s talk.
              </p>
              <Link
                href="/contact"
                className="relative mt-8 inline-block rounded-xl bg-accent-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent-600/30 transition hover:-translate-y-0.5 hover:bg-accent-500"
              >
                Contact Me
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

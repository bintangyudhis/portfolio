import { getExperience } from "@/lib/store";
import Reveal from "@/components/Reveal";
import { Experience } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Experience — Bintang Yudhistira",
  description: "Work experience and education of Bintang Yudhistira.",
};

const typeStyle: Record<Experience["type"], { label: string; cls: string }> = {
  work: { label: "Work", cls: "bg-accent-600/15 text-accent-300" },
  education: { label: "Education", cls: "bg-mint-400/15 text-mint-400" },
  organization: { label: "Organization", cls: "bg-amber-400/15 text-amber-300" },
};

export default async function ExperiencePage() {
  const experience = await getExperience();

  return (
    <section className="pt-32 pb-20 md:pt-40">
      <div className="mx-auto max-w-4xl px-5">
        <Reveal className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent-400">
            Journey
          </p>
          <h1 className="font-display text-4xl font-bold text-white md:text-5xl">
            Experience <span className="text-gradient">&</span> Education
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            My professional journey so far — work, education, and everything in
            between.
          </p>
        </Reveal>

        <div className="relative space-y-8 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-white/10">
          {experience.map((e, i) => {
            const t = typeStyle[e.type];
            return (
              <Reveal key={e.id} delay={i * 80}>
                <div className="relative pl-10">
                  <span className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 border-accent-400 bg-ink-950" />
                  <div className="glass rounded-2xl p-6 transition hover:border-accent-500/30">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${t.cls}`}>
                        {t.label}
                      </span>
                      <span className="text-xs text-slate-500">
                        {e.startDate} — {e.endDate}
                      </span>
                    </div>
                    <h3 className="font-display mt-3 text-xl font-bold text-white">
                      {e.role}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-accent-300">
                      {e.organization}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">
                      {e.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {experience.length === 0 && (
          <p className="text-center text-slate-500">No entries yet.</p>
        )}
      </div>
    </section>
  );
}

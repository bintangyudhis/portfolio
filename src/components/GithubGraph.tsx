"use client";

import { useMemo, useState } from "react";
import { t, type Locale } from "@/lib/i18n";
import type { ContributionYear } from "@/lib/github";

/**
 * GitHub contributions graph in the reference site's pattern: a card
 * with year tabs and a week-by-week heatmap of daily contribution
 * counts, colored on the theme accent. Data comes from the server
 * fetch in lib/github; this component only renders it.
 */

const LEVEL_CLS = [
  "bg-[#E9E9F4] dark:bg-[#1C1440]",
  "bg-[#C5C5EF] dark:bg-[#37267A]",
  "bg-[#9B9BE7] dark:bg-[#5B34C4]",
  "bg-[#7070DD] dark:bg-[#8146F0]",
  "bg-flame",
];

export default function GithubGraph({
  locale,
  years,
}: {
  locale: Locale;
  years: ContributionYear[];
}) {
  const [selected, setSelected] = useState(0);
  const active = years[selected] ?? years[0];

  const cells = useMemo(() => {
    if (!active) return [];
    const today = new Date().toISOString().slice(0, 10);
    const days = active.days.filter((d) => d.date <= today);
    if (days.length === 0) return [];
    const pad = new Date(days[0].date + "T00:00:00Z").getUTCDay();
    return [
      ...Array.from({ length: pad }, () => null),
      ...days,
    ] as Array<null | (typeof days)[number]>;
  }, [active]);

  if (!active || years.length === 0) return null;

  return (
    <section>
      <div className="mx-auto w-full max-w-6xl px-5 pb-14 md:px-8 md:pb-20">
        <div className="rounded-3xl border border-line bg-panel p-6 shadow-card md:p-8">
          <div className="flex flex-wrap items-center gap-4">
            <p className="font-mono text-xs font-medium tracking-[0.18em] text-flame uppercase">
              {t("githubGraphTitle", locale)}
            </p>
            <div className="ml-auto flex gap-2">
              {years.map((y, i) => (
                <button
                  key={y.year}
                  type="button"
                  onClick={() => setSelected(i)}
                  className={`rounded-full px-3.5 py-1.5 font-mono text-xs font-medium transition-colors ${
                    i === selected
                      ? "bg-flame text-on-accent"
                      : "border border-line text-faded hover:border-flame hover:text-flame"
                  }`}
                >
                  {y.year}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 overflow-x-auto pb-1">
            <div className="grid w-max grid-flow-col grid-rows-7 gap-[3px]">
              {cells.map((d, i) =>
                d === null ? (
                  <span key={`pad-${i}`} className="h-2.5 w-2.5" />
                ) : (
                  <span
                    key={d.date}
                    title={`${d.date}: ${d.count}`}
                    className={`h-2.5 w-2.5 rounded-[2px] ${LEVEL_CLS[Math.min(4, Math.max(0, d.level))]}`}
                  />
                )
              )}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="text-sm text-faded">
              <span className="font-bold text-ink tabular-nums">{active.total}</span>{" "}
              {t("graphContributions", locale)} · {active.year}
            </p>
            <p className="ml-auto flex items-center gap-1.5 text-xs text-faded">
              {t("graphLess", locale)}
              {LEVEL_CLS.map((cls) => (
                <span key={cls} className={`h-2.5 w-2.5 rounded-[2px] ${cls}`} />
              ))}
              {t("graphMore", locale)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

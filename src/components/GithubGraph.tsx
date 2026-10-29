"use client";

import { useMemo, useState } from "react";
import { ArrowUpRightIcon } from "./icons";
import { t, type Locale } from "@/lib/i18n";
import type { ContributionYear, ContributionDay } from "@/lib/github";

/**
 * Contribution history card in the reference site's pattern: a title
 * with the year's total, a year dropdown, and a heatmap with month
 * labels across the top and weekday labels (Mon, Wed, Fri) down the
 * left, over a five-step legend. Data is fetched server-side in
 * lib/github; this component only renders and switches years.
 */

const LEVEL_CLS = [
  "bg-[#EDEDF6] dark:bg-[#1C1440]",
  "bg-[#C5C5EF] dark:bg-[#37267A]",
  "bg-[#9B9BE7] dark:bg-[#5B34C4]",
  "bg-[#7070DD] dark:bg-[#8146F0]",
  "bg-flame",
];

const CELL = "h-2.5 w-2.5 rounded-[2px]";

/** Graph cells stretch with the card: one flexible column per week. */
const GCELL = "aspect-square w-full rounded-[2px]";

type Cell = ContributionDay | null;

export default function GithubGraph({
  locale,
  years,
  githubUrl,
}: {
  locale: Locale;
  years: ContributionYear[];
  githubUrl: string;
}) {
  const [selected, setSelected] = useState(0);
  const active = years[selected] ?? years[0];

  const { weeks, monthLabels } = useMemo(() => {
    if (!active) return { weeks: [] as Cell[][], monthLabels: [] as string[] };
    const today = new Date().toISOString().slice(0, 10);
    const days = active.days.filter((d) => d.date <= today);
    if (days.length === 0) return { weeks: [], monthLabels: [] };

    const pad = new Date(days[0].date + "T00:00:00Z").getUTCDay();
    const cells: Cell[] = [
      ...Array.from({ length: pad }, () => null),
      ...days,
    ];
    while (cells.length % 7 !== 0) cells.push(null);

    const cols: Cell[][] = [];
    for (let i = 0; i < cells.length; i += 7) cols.push(cells.slice(i, i + 7));

    const monthFmt = new Intl.DateTimeFormat(
      locale === "id" ? "id-ID" : locale === "jp" ? "ja-JP" : "en-US",
      { month: "short", timeZone: "UTC" }
    );
    const labels: string[] = [];
    let lastMonth = -1;
    for (const col of cols) {
      const first = col.find((c) => c !== null);
      if (!first) {
        labels.push("");
        continue;
      }
      const m = new Date(first.date + "T00:00:00Z").getUTCMonth();
      if (m !== lastMonth) {
        labels.push(monthFmt.format(new Date(first.date + "T00:00:00Z")));
        lastMonth = m;
      } else {
        labels.push("");
      }
    }
    return { weeks: cols, monthLabels: labels };
  }, [active, locale]);

  if (!active || years.length === 0) return null;

  const dayLabels =
    locale === "jp" ? ["", "月", "", "水", "", "金", ""] : ["", "Mon", "", "Wed", "", "Fri", ""];

  return (
    <section>
      <div className="w-full px-5 pt-6 pb-14 md:px-8 md:pb-20">
        <div className="rounded-3xl border border-line bg-panel p-6 shadow-card md:p-8">
          <div className="flex flex-wrap items-start gap-4">
            <div>
              <p className="text-lg font-extrabold tracking-tight text-ink">
                {t("graphHistoryTitle", locale)}
              </p>
              <p className="mt-0.5 text-sm text-faded">
                {active.total} {t("graphContributions", locale)} · {active.year}
              </p>
            </div>
            <select
              aria-label={t("graphHistoryTitle", locale)}
              value={selected}
              onChange={(e) => setSelected(Number(e.target.value))}
              className="ml-auto rounded-lg border border-line bg-paper px-3 py-2 font-mono text-sm text-ink focus:border-flame focus:outline-none"
            >
              {years.map((y, i) => (
                <option key={y.year} value={i}>
                  {y.year}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6 overflow-x-auto pb-1">
            <div className="flex w-full min-w-[620px] gap-2">
              <div className="flex flex-col gap-[3px] pt-[18px]">
                {dayLabels.map((d, i) => (
                  <span
                    key={i}
                    className="flex flex-1 items-center text-[10px] leading-none text-faded"
                  >
                    {d}
                  </span>
                ))}
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1.5 grid grid-flow-col gap-[3px] [grid-auto-columns:1fr]">
                  {monthLabels.map((m, i) => (
                    <span key={i} className="w-full text-[10px] whitespace-nowrap text-faded">
                      {m}
                    </span>
                  ))}
                </div>
                <div className="grid grid-flow-col grid-rows-7 gap-[3px] [grid-auto-columns:1fr]">
                  {weeks.flatMap((col, ci) =>
                    col.map((d, ri) =>
                      d === null ? (
                        <span key={`${ci}-${ri}`} className={GCELL} />
                      ) : (
                        <span
                          key={d.date}
                          title={`${d.date}: ${d.count}`}
                          className={`${GCELL} ${LEVEL_CLS[Math.min(4, Math.max(0, d.level))]}`}
                        />
                      )
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-4">
            <p className="flex items-center gap-1.5 text-xs text-faded">
              {t("graphLess", locale)}
              {LEVEL_CLS.map((cls) => (
                <span key={cls} className={`${CELL} ${cls}`} />
              ))}
              {t("graphMore", locale)}
            </p>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-faded transition-colors hover:text-flame"
            >
              GitHub @bintangyudhis
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

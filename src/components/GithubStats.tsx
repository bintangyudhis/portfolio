import type { ReactNode } from "react";
import SectionHead from "./SectionHead";
import { t, type Locale } from "@/lib/i18n";
import type { GithubData, ContributionYear } from "@/lib/github";

/**
 * GitHub statistics in the reference site's layout: a row of cards,
 * each with an icon in a lavender circle, a big number, and a label.
 * Numbers come from the live GitHub fetch; a figure that could not be
 * fetched drops its card instead of guessing.
 */

const iconCls = "h-5 w-5";

const ICONS: Record<string, ReactNode> = {
  contributions: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconCls} aria-hidden>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  repos: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconCls} aria-hidden>
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  ),
  stars: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconCls} aria-hidden>
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
  ),
  followers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconCls} aria-hidden>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  following: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconCls} aria-hidden>
      <path d="M2 21a8 8 0 0 1 13.292-6.062" />
      <circle cx="10" cy="8" r="5" />
      <path d="M22 19h-6" />
      <path d="M19 16v6" />
    </svg>
  ),
};

export default function GithubStats({
  locale,
  data,
  contributions,
}: {
  locale: Locale;
  data: GithubData;
  contributions: ContributionYear[] | null;
}) {
  const totalContributions =
    contributions && contributions.length > 0
      ? contributions.reduce((sum, y) => sum + y.total, 0)
      : null;

  const cards: { icon: ReactNode; value: number; label: string }[] = [];
  if (totalContributions !== null)
    cards.push({ icon: ICONS.contributions, value: totalContributions, label: t("statCardContributions", locale) });
  if (data.publicRepos !== null)
    cards.push({ icon: ICONS.repos, value: data.publicRepos, label: t("statCardRepos", locale) });
  if (data.totalStars !== null)
    cards.push({ icon: ICONS.stars, value: data.totalStars, label: t("statCardStars", locale) });
  if (data.followers !== null)
    cards.push({ icon: ICONS.followers, value: data.followers, label: t("statCardFollowers", locale) });
  if (data.following !== null)
    cards.push({ icon: ICONS.following, value: data.following, label: t("statCardFollowing", locale) });

  if (cards.length === 0) return null;

  return (
    <section id="github-stats" className="scroll-mt-24">
      <div className="w-full px-5 pt-14 md:px-8 md:pt-20">
        <SectionHead
          label={t("githubLabel", locale)}
          title={t("githubStatsTitle", locale)}
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
          {cards.map((c) => (
            <div
              key={c.label}
              className="flex flex-col items-center rounded-3xl border border-line bg-panel px-4 py-6 text-center shadow-card"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E4E4FB] text-flame dark:bg-[#241A4D]">
                {c.icon}
              </span>
              <span className="mt-3.5 text-3xl font-extrabold tracking-tight text-ink tabular-nums">
                {c.value}
              </span>
              <span className="mt-1 text-sm text-faded">{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

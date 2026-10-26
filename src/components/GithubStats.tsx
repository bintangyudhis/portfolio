import SectionHead from "./SectionHead";
import { GithubIcon } from "./icons";
import { t, type Locale } from "@/lib/i18n";
import type { GithubData } from "@/lib/github";

/**
 * GitHub statistics as an editorial grid of real numbers, computed from
 * the same fetch as the project list. A number that could not be fetched
 * is omitted, never estimated. If nothing is known, the section
 * disappears.
 */
export default function GithubStats({
  locale,
  data,
  githubUrl,
}: {
  locale: Locale;
  data: GithubData;
  githubUrl: string;
}) {
  const stats: { value: number; label: string }[] = [];
  if (data.publicRepos !== null)
    stats.push({ value: data.publicRepos, label: t("statReposLabel", locale) });
  if (data.totalStars !== null)
    stats.push({ value: data.totalStars, label: t("statStarsLabel", locale) });
  if (data.totalForks !== null)
    stats.push({ value: data.totalForks, label: t("statForksLabel", locale) });
  if (data.followers !== null)
    stats.push({ value: data.followers, label: t("statFollowersLabel", locale) });
  if (data.following !== null)
    stats.push({ value: data.following, label: t("statFollowingLabel", locale) });
  if (data.pullRequests !== null)
    stats.push({ value: data.pullRequests, label: t("statPullRequestsLabel", locale) });
  if (data.issues !== null)
    stats.push({ value: data.issues, label: t("statIssuesLabel", locale) });

  if (stats.length === 0) return null;

  const metaParts: string[] = [];
  if (data.topLanguages && data.topLanguages.length > 0)
    metaParts.push(
      `${t("statTopLanguages", locale)}: ${data.topLanguages.join(", ")}`
    );
  if (data.memberSince !== null)
    metaParts.push(`${t("statMemberSince", locale)} ${data.memberSince}`);

  return (
    <section>
      <div className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <SectionHead
          label={t("githubLabel", locale)}
          title={t("githubStatsTitle", locale)}
        />
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-t border-line pt-4">
              <dd className="text-4xl font-extrabold tracking-tight text-ink tabular-nums md:text-5xl">
                {s.value}
              </dd>
              <dt className="mt-1.5 font-mono text-xs font-medium tracking-[0.14em] text-faded uppercase">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
        <p className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 leading-relaxed text-faded">
          {metaParts.length > 0 && <span>{metaParts.join("  ·  ")}</span>}
          {metaParts.length > 0 && <span aria-hidden="true">·</span>}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium transition-colors hover:text-flame"
          >
            <GithubIcon className="h-[18px] w-[18px]" />
            github.com/bintangyudhis
          </a>
        </p>
        <p className="mt-3 text-sm text-faded">{t("statsUpdatedNote", locale)}</p>
      </div>
    </section>
  );
}

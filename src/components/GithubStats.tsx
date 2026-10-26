import SectionHead from "./SectionHead";
import { t, type Locale } from "@/lib/i18n";
import type { GithubData } from "@/lib/github";

/**
 * GitHub statistics as one plain line of real numbers, computed from the
 * same fetch as the project list. A number that could not be fetched is
 * omitted — never estimated. If nothing is known, the section disappears.
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
  const parts: string[] = [];
  if (data.publicRepos !== null)
    parts.push(`${data.publicRepos} ${t("statRepos", locale)}`);
  if (data.totalStars !== null)
    parts.push(`${data.totalStars} ${t("statStars", locale)}`);
  if (data.followers !== null)
    parts.push(`${data.followers} ${t("statFollowers", locale)}`);

  if (parts.length === 0) return null;

  return (
    <section className="border-t border-line">
      <div className="mx-auto w-full max-w-5xl px-5 py-14 md:px-8 md:py-20">
        <SectionHead
          label={t("githubLabel", locale)}
          title={t("githubStatsTitle", locale)}
        />
        <p className="mt-7 font-display text-2xl leading-snug font-medium text-ink wrap-anywhere md:text-[1.8rem]">
          {parts.join("  ·  ")}
        </p>
        <p className="mt-5 text-sm font-medium">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-line underline-offset-4 transition-colors hover:text-flame hover:decoration-flame"
          >
            github.com/bintangyudhis
          </a>
        </p>
      </div>
    </section>
  );
}

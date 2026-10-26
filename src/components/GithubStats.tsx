import SectionHead from "./SectionHead";
import { GithubIcon } from "./icons";
import { t, type Locale } from "@/lib/i18n";
import type { GithubData } from "@/lib/github";

/**
 * GitHub statistics as one mono line of real numbers inside a soft card,
 * computed from the same fetch as the project list. A number that could
 * not be fetched is omitted, never estimated. If nothing is known, the
 * section disappears.
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
    <section>
      <div className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <SectionHead
          label={t("githubLabel", locale)}
          title={t("githubStatsTitle", locale)}
        />
        <div className="mt-8 rounded-3xl border border-line bg-panel p-6 shadow-card md:p-8">
          <p className="font-mono text-base leading-relaxed text-ink wrap-anywhere md:text-lg">
            {parts.join("  ·  ")}
          </p>
          <p className="mt-4">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-medium text-faded transition-colors hover:text-flame"
            >
              <GithubIcon className="h-[18px] w-[18px]" />
              github.com/bintangyudhis
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

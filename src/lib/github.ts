// Public GitHub data for the "all projects" section and the statistics
// section. Server-side only, no credentials — the public REST API and
// the Search API are enough. Responses ride the Next.js Data Cache
// (revalidate 300), so the numbers feel current while the public
// 60 req/h unauthenticated budget stays safe.
// Any failure returns nulls and the UI omits that figure — never invents.
// Note: the Search API is used for issues/PRs only; commit search is
// deliberately avoided because its index fluctuates wildly.

const USERNAME = "bintangyudhis";
const PROFILE_REPO = "bintangyudhis";

export interface GithubRepo {
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
  /** ISO timestamp of the last update (shown in the row). */
  updatedAt: string;
}

export interface GithubData {
  /** Display-ready repos, or null when the API could not be reached. */
  repos: GithubRepo[] | null;
  /** Sum of stars over every fetched repo (null when unknown). */
  totalStars: number | null;
  /** Sum of forks over every fetched repo (null when unknown). */
  totalForks: number | null;
  publicRepos: number | null;
  followers: number | null;
  following: number | null;
  /** Calendar year the account was created (null when unknown). */
  memberSince: number | null;
  /** Up to three most-used repo languages, most frequent first. */
  topLanguages: string[] | null;
  /** Total pull requests authored (Search API total_count). */
  pullRequests: number | null;
  /** Total issues authored (Search API total_count). */
  issues: number | null;
}

interface RawRepo {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  pushed_at: string;
  updated_at: string;
}

interface RawUser {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface RawSearchTotal {
  total_count: number;
}

async function gh<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`https://api.github.com${path}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "portfolio-bintang",
      },
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function searchTotal(type: "pr" | "issue"): Promise<RawSearchTotal | null> {
  const q = encodeURIComponent(`author:${USERNAME} type:${type}`);
  return gh<RawSearchTotal>(`/search/issues?q=${q}`);
}

export async function getGithubData(): Promise<GithubData> {
  const [rawRepos, user, prSearch, issueSearch] = await Promise.all([
    gh<RawRepo[]>(`/users/${USERNAME}/repos?per_page=100&sort=pushed`),
    gh<RawUser>(`/users/${USERNAME}`),
    searchTotal("pr"),
    searchTotal("issue"),
  ]);

  const pullRequests =
    typeof prSearch?.total_count === "number" ? prSearch.total_count : null;
  const issues =
    typeof issueSearch?.total_count === "number" ? issueSearch.total_count : null;

  const memberYear = user?.created_at
    ? new Date(user.created_at).getUTCFullYear()
    : NaN;

  const fromUser = {
    publicRepos: user?.public_repos ?? null,
    followers: user?.followers ?? null,
    following: user?.following ?? null,
    memberSince: Number.isFinite(memberYear) ? memberYear : null,
  };

  if (!rawRepos) {
    return {
      repos: null,
      totalStars: null,
      totalForks: null,
      topLanguages: null,
      pullRequests,
      issues,
      ...fromUser,
    };
  }

  const totalStars = rawRepos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = rawRepos.reduce((sum, r) => sum + (r.forks_count ?? 0), 0);

  const languageCounts = new Map<string, number>();
  for (const r of rawRepos) {
    if (r.language) {
      languageCounts.set(r.language, (languageCounts.get(r.language) ?? 0) + 1);
    }
  }
  const topLanguages = [...languageCounts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 3)
    .map(([language]) => language);

  const repos = rawRepos
    .filter((r) => r.name !== PROFILE_REPO)
    .filter((r) => !r.fork || r.stargazers_count > 0 || Boolean(r.description))
    .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))
    .map((r) => ({
      name: r.name,
      url: r.html_url,
      description: r.description,
      language: r.language,
      stars: r.stargazers_count,
      updatedAt: r.updated_at,
    }));

  return {
    repos,
    totalStars,
    totalForks,
    topLanguages,
    pullRequests,
    issues,
    ...fromUser,
    publicRepos: fromUser.publicRepos ?? repos.length,
  };
}

/* ------------------------------------------------------------------ */
/* Contribution graph (per-day counts per calendar year)               */
/* ------------------------------------------------------------------ */

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface ContributionYear {
  year: number;
  total: number;
  days: ContributionDay[];
}

interface RawContributions {
  total?: Record<string, number>;
  contributions?: { date: string; count: number; level: number }[];
}

/**
 * Daily contribution counts from the public contributions API (the same
 * data GitHub's own profile graph shows). Three calendar years: the
 * current one plus the two before it. Any failure returns null and the
 * graph section hides itself — numbers are never invented.
 */
export async function getContributions(): Promise<ContributionYear[] | null> {
  const now = new Date().getFullYear();
  const years = [now, now - 1, now - 2];
  const results = await Promise.all(
    years.map(async (year): Promise<ContributionYear | null> => {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=${year}`,
          { next: { revalidate: 3600 } }
        );
        if (!res.ok) return null;
        const data = (await res.json()) as RawContributions;
        const days = (data.contributions ?? []).filter(
          (d) => typeof d.count === "number" && typeof d.date === "string"
        );
        if (days.length === 0) return null;
        const total =
          data.total?.[String(year)] ??
          days.reduce((sum, d) => sum + d.count, 0);
        return { year, total, days };
      } catch {
        return null;
      }
    })
  );
  const ok = results.filter((r): r is ContributionYear => r !== null);
  return ok.length > 0 ? ok : null;
}

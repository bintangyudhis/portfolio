// Public GitHub data for the "all projects" section and the statistics
// line. Server-side only, no credentials — the public REST API is enough.
// Responses ride the Next.js Data Cache (revalidate 3600), so the public
// 60 req/h unauthenticated budget is never a problem in practice.
// Any failure returns nulls and the UI falls back / omits — never invents.

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
  publicRepos: number | null;
  followers: number | null;
}

interface RawRepo {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  pushed_at: string;
  updated_at: string;
}

interface RawUser {
  public_repos: number;
  followers: number;
}

async function gh<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`https://api.github.com${path}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "portfolio-bintang",
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getGithubData(): Promise<GithubData> {
  const [rawRepos, user] = await Promise.all([
    gh<RawRepo[]>(`/users/${USERNAME}/repos?per_page=100&sort=pushed`),
    gh<RawUser>(`/users/${USERNAME}`),
  ]);

  if (!rawRepos) {
    return {
      repos: null,
      totalStars: null,
      publicRepos: user?.public_repos ?? null,
      followers: user?.followers ?? null,
    };
  }

  const totalStars = rawRepos.reduce((sum, r) => sum + r.stargazers_count, 0);

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
    publicRepos: user?.public_repos ?? repos.length,
    followers: user?.followers ?? null,
  };
}

import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Publications from "@/components/Publications";
import Projects from "@/components/Projects";
import GithubProjects from "@/components/GithubProjects";
import Skills from "@/components/Skills";
import GithubStats from "@/components/GithubStats";
import GithubGraph from "@/components/GithubGraph";
import Contact from "@/components/Contact";
import { getPortfolioContent } from "@/lib/db";
import { getGithubData, getContributions } from "@/lib/github";
import { getLocale } from "@/lib/lang";

export const dynamic = "force-dynamic";

export default async function Home() {
  const locale = await getLocale();
  const [content, github, contributions] = await Promise.all([
    getPortfolioContent(),
    getGithubData(),
    getContributions(),
  ]);

  return (
    <>
      <Hero locale={locale} profile={content.profile} />
      <About locale={locale} profile={content.profile} />
      <Experience locale={locale} items={content.experiences} />
      <Education
        locale={locale}
        items={content.experiences}
        certifications={content.certifications}
        languages={content.profile.languages}
      />
      <Publications locale={locale} items={content.publications} />
      <Projects
        locale={locale}
        projects={content.projects}
        viewAllCount={github.repos?.length ?? content.projects.length}
      />
      <GithubProjects
        locale={locale}
        data={github}
        fallbackProjects={content.projects}
      />
      <Skills locale={locale} groups={content.skillGroups} />
      <GithubStats locale={locale} data={github} contributions={contributions} />
      {contributions && (
        <GithubGraph
          locale={locale}
          years={contributions}
          githubUrl={content.profile.githubUrl}
        />
      )}
      <Contact locale={locale} profile={content.profile} />
    </>
  );
}

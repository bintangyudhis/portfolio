import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import GithubProjects from "@/components/GithubProjects";
import Skills from "@/components/Skills";
import GithubStats from "@/components/GithubStats";
import Contact from "@/components/Contact";
import { getPortfolioContent } from "@/lib/db";
import { getGithubData } from "@/lib/github";
import { getLocale } from "@/lib/lang";

export const dynamic = "force-dynamic";

export default async function Home() {
  const locale = await getLocale();
  const [content, github] = await Promise.all([
    getPortfolioContent(),
    getGithubData(),
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
      <GithubStats
        locale={locale}
        data={github}
        githubUrl={content.profile.githubUrl}
      />
      <Contact locale={locale} profile={content.profile} />
    </>
  );
}

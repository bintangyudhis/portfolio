import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import { getPortfolioContent } from "@/lib/db";
import { getLocale } from "@/lib/lang";

export const dynamic = "force-dynamic";

export default async function Home() {
  const locale = await getLocale();
  const content = await getPortfolioContent();

  return (
    <>
      <Hero locale={locale} profile={content.profile} />
      <About locale={locale} profile={content.profile} />
      <Experience locale={locale} items={content.experiences} />
      <Projects locale={locale} projects={content.projects} />
      <Skills
        locale={locale}
        groups={content.skillGroups}
        certifications={content.certifications}
        languages={content.profile.languages}
      />
      <Contact locale={locale} profile={content.profile} />
    </>
  );
}

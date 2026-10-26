import ContactForm from "./ContactForm";
import { pick, t, type Locale } from "@/lib/i18n";
import type { ProfileContent } from "@/lib/content";

export default function Contact({
  locale,
  profile,
}: {
  locale: Locale;
  profile: ProfileContent;
}) {
  const channels = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { label: "GitHub", value: "github.com/bintangyudhis", href: profile.githubUrl },
    { label: "LinkedIn", value: "Bintang Yudhistira", href: profile.linkedinUrl },
    { label: "Instagram", value: "@yudhis_gaiden", href: profile.instagramUrl },
    { label: "Discord", value: "KaiHav", href: profile.discordUrl },
  ];

  return (
    <section id="contact" className="scroll-mt-24 bg-coal text-paper">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8 md:py-24">
        <div className="md:col-span-5">
          <h2 className="font-display text-4xl leading-tight font-semibold md:text-5xl">
            {t("contactTitle", locale)}
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-paper/75">
            {t("contactIntro", locale)}
          </p>

          <ul className="mt-10 space-y-0">
            {channels.map((c) => (
              <li key={c.label} className="border-t border-coal-line">
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-4 py-3.5"
                >
                  <span className="text-xs font-semibold tracking-[0.08em] text-coal-faded uppercase">
                    {c.label}
                  </span>
                  <span className="text-right font-medium break-all text-paper/90 transition-colors group-hover:text-flame">
                    {c.value}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-coal-faded">
            {pick(profile.location, locale)}
          </p>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <ContactForm locale={locale} />
        </div>
      </div>
    </section>
  );
}

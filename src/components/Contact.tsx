import ContactForm from "./ContactForm";
import { pick, t, type Locale } from "@/lib/i18n";
import type { ProfileContent } from "@/lib/content";

/**
 * Contact on the dark band (deep ink in light mode, deeper void in the
 * Gojo theme): one big upright heading, the channels as plain rows, and
 * the existing form.
 */
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
    <section
      id="contact"
      className="scroll-mt-24 border-t border-band-line bg-band text-band-ink"
    >
      <div className="mx-auto grid w-full max-w-5xl gap-12 px-5 py-14 md:grid-cols-12 md:px-8 md:py-20">
        <div className="min-w-0 md:col-span-5">
          <p className="text-[13px] font-semibold tracking-[0.14em] text-band-faded uppercase">
            {t("navContact", locale)}
          </p>
          <h2 className="mt-3 font-display text-[clamp(2.3rem,6vw,3.6rem)] leading-[1.05] font-semibold wrap-anywhere">
            {t("contactTitle", locale)}
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-band-ink/75">
            {t("contactIntro", locale)}
          </p>

          <ul className="mt-10">
            {channels.map((c) => (
              <li key={c.label} className="border-t border-band-line">
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-4 py-3.5"
                >
                  <span className="text-xs font-semibold tracking-[0.08em] text-band-faded uppercase">
                    {c.label}
                  </span>
                  <span className="min-w-0 text-right font-medium break-all text-band-ink/90 transition-colors group-hover:text-flame">
                    {c.value}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-band-faded">
            {pick(profile.location, locale)}
          </p>
        </div>

        <div className="min-w-0 md:col-span-6 md:col-start-7">
          <ContactForm locale={locale} />
        </div>
      </div>
    </section>
  );
}

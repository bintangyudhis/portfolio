import ContactForm from "./ContactForm";
import { ArrowUpRightIcon } from "./icons";
import { pick, t, type Locale } from "@/lib/i18n";
import type { ProfileContent } from "@/lib/content";

/**
 * Contact as one big rounded card: a heavy heading, the channels as
 * plain rows on the left, and the existing form on the right.
 */
export default function Contact({
  locale,
  profile,
}: {
  locale: Locale;
  profile: ProfileContent;
}) {
  const channels = [
    { label: "GitHub", value: "github.com/bintangyudhis", href: profile.githubUrl },
    { label: "LinkedIn", value: "Bintang Yudhistira", href: profile.linkedinUrl },
    { label: "Instagram", value: "@yudhis_gaiden", href: profile.instagramUrl },
    { label: "Discord", value: "KaiHav", href: profile.discordUrl },
  ];

  return (
    <section id="contact" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <div className="rounded-3xl border border-line bg-panel p-6 shadow-card md:p-10">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="min-w-0 md:col-span-5">
              <p className="font-mono text-xs font-medium tracking-[0.18em] text-flame uppercase">
                {t("navContact", locale)}
              </p>
              <h2 className="mt-2.5 text-[clamp(2.2rem,5.5vw,3.4rem)] leading-[1.05] font-extrabold tracking-tight text-ink wrap-anywhere">
                {t("contactTitle", locale)}
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-faded">
                {t("contactIntro", locale)}
              </p>

              <div className="mt-8">
                <p className="font-mono text-xs tracking-[0.08em] text-faded uppercase">
                  Email
                </p>
                {[profile.email, profile.email2]
                  .filter((addr): addr is string => Boolean(addr))
                  .map((addr) => (
                    <a
                      key={addr}
                      href={`mailto:${addr}`}
                      className="mt-1.5 block text-[clamp(1.3rem,3.4vw,1.75rem)] leading-snug font-extrabold tracking-tight break-all text-ink underline decoration-flame decoration-2 underline-offset-4 transition-colors hover:text-flame"
                    >
                      {addr}
                    </a>
                  ))}
                <p className="mt-2 text-sm text-faded">
                  {t("contactEmailHint", locale)}
                </p>
              </div>

              <ul className="mt-9 divide-y divide-line">
                {channels.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group flex items-baseline justify-between gap-4 py-3.5"
                    >
                      <span className="font-mono text-xs tracking-[0.08em] text-faded uppercase">
                        {c.label}
                      </span>
                      <span className="inline-flex min-w-0 items-center gap-1.5 font-medium break-all text-ink/90 transition-colors group-hover:text-flame">
                        {c.value}
                        {c.href.startsWith("http") && (
                          <ArrowUpRightIcon className="h-3.5 w-3.5 shrink-0 text-faded" />
                        )}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-mono text-[13px] text-faded">
                {pick(profile.location, locale)}
              </p>
            </div>

            <div className="min-w-0 md:col-span-6 md:col-start-7">
              <ContactForm locale={locale} inboxEmail={profile.email2 ?? profile.email} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

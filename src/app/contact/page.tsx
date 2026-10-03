import { profile } from "@/lib/seed";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact — Bintang Yudhistira",
  description: "Get in touch with Bintang Yudhistira.",
};

export default function ContactPage() {
  return (
    <section className="pt-32 pb-20 md:pt-40">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent-400">
            Contact
          </p>
          <h1 className="font-display text-4xl font-bold text-white md:text-5xl">
            Let&apos;s <span className="text-gradient">Talk</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Have a project, opportunity, or question? Send me a message — I
            usually reply within a day or two.
          </p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="space-y-4">
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display mb-2 text-lg font-bold text-white">
                  Direct channels
                </h3>
                <p className="mb-4 text-sm text-slate-400">
                  Prefer another platform? Find me here:
                </p>
                <div className="space-y-3">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-accent-500/40 hover:bg-white/10"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-600/20">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#a5b4fc">
                        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12v3.15c0 .3.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
                      </svg>
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-white">GitHub</span>
                      <span className="block text-xs text-slate-500">@bintangyudhis</span>
                    </span>
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-accent-500/40 hover:bg-white/10"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-600/20">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#a5b4fc">
                        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
                      </svg>
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-white">LinkedIn</span>
                      <span className="block text-xs text-slate-500">Bintang Yudhistira</span>
                    </span>
                  </a>
                </div>
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="font-display mb-2 text-lg font-bold text-white">
                  Location
                </h3>
                <p className="text-sm text-slate-400">
                  {profile.location}
                  <br />
                  Open to remote work & collaboration.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-3">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

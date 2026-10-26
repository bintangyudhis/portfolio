"use client";

import { useEffect, useRef, useState } from "react";
import { t, type Locale } from "@/lib/i18n";

type State = "idle" | "sending" | "sent" | "error";

const inputCls =
  "w-full border border-coal-line bg-coal-soft px-4 py-3 text-paper placeholder:text-coal-faded/70 focus:border-flame focus:outline-none";

export default function ContactForm({ locale }: { locale: Locale }) {
  const [state, setState] = useState<State>("idle");
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
          website: data.get("website"), // honeypot
          ts: mountedAt.current,
        }),
      });
      if (!res.ok) throw new Error("send failed");
      setState("sent");
      form.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <p className="border border-coal-line bg-coal-soft px-5 py-4 leading-relaxed text-paper">
        {t("formSent", locale)}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-xs font-semibold tracking-[0.08em] text-coal-faded uppercase">
            {t("formName", locale)}
          </label>
          <input id="cf-name" name="name" required maxLength={80} className={inputCls} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="cf-email" className="mb-1.5 block text-xs font-semibold tracking-[0.08em] text-coal-faded uppercase">
            {t("formEmail", locale)}
          </label>
          <input id="cf-email" name="email" type="email" required maxLength={120} className={inputCls} autoComplete="email" />
        </div>
      </div>
      <div>
        <label htmlFor="cf-subject" className="mb-1.5 block text-xs font-semibold tracking-[0.08em] text-coal-faded uppercase">
          {t("formSubject", locale)}
        </label>
        <input id="cf-subject" name="subject" required maxLength={120} className={inputCls} />
      </div>
      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-xs font-semibold tracking-[0.08em] text-coal-faded uppercase">
          {t("formMessage", locale)}
        </label>
        <textarea id="cf-message" name="message" required maxLength={2000} rows={5} className={`${inputCls} resize-y`} />
      </div>

      {/* Honeypot — humans never see or fill this. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state === "error" && (
        <p className="border border-flame/60 bg-coal-soft px-4 py-3 text-sm text-paper">
          {t("formError", locale)}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="bg-flame px-6 py-3 text-sm font-semibold whitespace-nowrap text-paper transition-colors hover:bg-paper hover:text-ink disabled:cursor-wait disabled:opacity-60"
      >
        {state === "sending" ? t("formSending", locale) : t("formSend", locale)}
      </button>
    </form>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { t, type Locale } from "@/lib/i18n";

type State = "idle" | "sending" | "sent" | "error";

const inputCls =
  "w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink placeholder:text-faded/60 focus:border-flame focus:outline-none";
const labelCls =
  "mb-1.5 block text-xs font-bold tracking-[0.08em] text-faded uppercase";

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
      <p className="rounded-2xl bg-inset px-5 py-4 leading-relaxed text-ink">
        {t("formSent", locale)}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelCls}>
            {t("formName", locale)}
          </label>
          <input id="cf-name" name="name" required maxLength={80} className={inputCls} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelCls}>
            {t("formEmail", locale)}
          </label>
          <input id="cf-email" name="email" type="email" required maxLength={120} className={inputCls} autoComplete="email" />
        </div>
      </div>
      <div>
        <label htmlFor="cf-subject" className={labelCls}>
          {t("formSubject", locale)}
        </label>
        <input id="cf-subject" name="subject" required maxLength={120} className={inputCls} />
      </div>
      <div>
        <label htmlFor="cf-message" className={labelCls}>
          {t("formMessage", locale)}
        </label>
        <textarea id="cf-message" name="message" required maxLength={2000} rows={5} className={`${inputCls} resize-y`} />
      </div>

      {/* Honeypot: humans never see or fill this. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state === "error" && (
        <p className="rounded-xl border border-flame/60 bg-inset px-4 py-3 text-sm text-ink">
          {t("formError", locale)}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="rounded-xl bg-flame px-6 py-3.5 text-sm font-semibold whitespace-nowrap text-on-accent transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
      >
        {state === "sending" ? t("formSending", locale) : t("formSend", locale)}
      </button>
    </form>
  );
}

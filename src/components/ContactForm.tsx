"use client";

import { useState } from "react";
import { t, type Locale, type UiKey } from "@/lib/i18n";

type State = "idle" | "ready" | "error";

interface Draft {
  name: string;
  email: string;
  message: string;
  subject: string;
  mailtoUrl: string;
  gmailUrl: string;
}

const inputCls =
  "w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink placeholder:text-faded/60 focus:border-flame focus:outline-none";
const labelCls =
  "mb-1.5 block text-xs font-bold tracking-[0.08em] text-faded uppercase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Contact form following the reference site's system: nothing is stored
 * on the server. Submitting composes an email draft in the visitor's own
 * email client (mailto) addressed to the inbox email, with Gmail Web as
 * an alternative. The visitor presses send in their mail app.
 */
export default function ContactForm({
  locale,
  inboxEmail,
}: {
  locale: Locale;
  inboxEmail: string;
}) {
  const [state, setState] = useState<State>("idle");
  const [errorKey, setErrorKey] = useState<UiKey>("formError");
  const [draft, setDraft] = useState<Draft | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const localError: UiKey | null =
      name.length < 2
        ? "formErrName"
        : !EMAIL_RE.test(email)
          ? "formErrEmail"
          : message.length < 10
            ? "formErrMessage"
            : null;
    if (localError) {
      setErrorKey(localError);
      setState("error");
      return;
    }

    const subject = `Portfolio Message from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailtoUrl = `mailto:${inboxEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(inboxEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setDraft({ name, email, message, subject, mailtoUrl, gmailUrl });
    setState("ready");
    window.location.href = mailtoUrl;
  }

  if (state === "ready" && draft) {
    const rows: Array<[string, string]> = [
      [t("formName", locale), draft.name],
      [t("formEmail", locale), draft.email],
      [t("formRecipient", locale), inboxEmail],
      [t("formMessage", locale), draft.message],
    ];
    return (
      <div className="rounded-2xl bg-inset px-5 py-5">
        <p className="text-lg font-extrabold tracking-tight text-ink">
          {t("formReadyTitle", locale)}
        </p>
        <p className="mt-1.5 leading-relaxed text-faded">
          {t("formReadyText", locale)}
        </p>
        <dl className="mt-4 space-y-2.5">
          {rows.map(([label, value]) => (
            <div key={label} className="flex gap-3 text-sm">
              <dt className="w-20 shrink-0 font-mono text-xs tracking-[0.08em] text-faded uppercase pt-0.5">
                {label}
              </dt>
              <dd className="min-w-0 font-medium break-words whitespace-pre-wrap text-ink">
                {value}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={draft.gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-flame px-5 py-3 text-sm font-semibold whitespace-nowrap text-on-accent transition-opacity hover:opacity-90"
          >
            {t("formOpenGmail", locale)}
          </a>
          <a
            href={draft.mailtoUrl}
            className="rounded-xl border border-line px-5 py-3 text-sm font-semibold whitespace-nowrap text-ink transition-colors hover:border-flame hover:text-flame"
          >
            {t("formOpenClient", locale)}
          </a>
          <button
            type="button"
            onClick={() => {
              setDraft(null);
              setState("idle");
            }}
            className="rounded-xl px-4 py-3 text-sm font-medium whitespace-nowrap text-faded transition-colors hover:text-ink"
          >
            {t("formSendAnother", locale)}
          </button>
        </div>
      </div>
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
        <label htmlFor="cf-message" className={labelCls}>
          {t("formMessage", locale)}
        </label>
        <textarea id="cf-message" name="message" required maxLength={2000} rows={5} className={`${inputCls} resize-y`} />
      </div>

      {state === "error" && (
        <p className="rounded-xl border border-flame/60 bg-inset px-4 py-3 text-sm text-ink">
          {t(errorKey, locale)}
        </p>
      )}

      <button
        type="submit"
        className="rounded-xl bg-flame px-6 py-3.5 text-sm font-semibold whitespace-nowrap text-on-accent transition-opacity hover:opacity-90"
      >
        {t("formSend", locale)}
      </button>
      <p className="text-sm text-faded">
        {t("formMailNote", locale)}{" "}
        <span className="font-medium break-all text-ink/90">{inboxEmail}</span>
      </p>
    </form>
  );
}

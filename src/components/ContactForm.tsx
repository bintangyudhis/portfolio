"use client";

import { useRef, useState } from "react";

const LIMITS = { name: 80, email: 120, subject: 120, message: 2000 };

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const loadedAt = useRef(Date.now());
  const honeypot = useRef<HTMLInputElement>(null);

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setForm((f) => ({ ...f, [key]: e.target.value.slice(0, LIMITS[key]) }));
    };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          website: honeypot.current?.value ?? "", // honeypot
          ts: loadedAt.current, // time-trap
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message.");
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-mint-400/15">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display text-xl font-bold text-white">Message sent!</h3>
        <p className="mt-2 text-sm text-slate-400">
          Thanks for reaching out — I&apos;ll get back to you as soon as I can.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-medium text-accent-300 hover:text-accent-400"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-xl border border-white/10 bg-ink-800/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-accent-500/60 focus:ring-2 focus:ring-accent-600/20";

  return (
    <form onSubmit={onSubmit} className="glass space-y-4 rounded-2xl p-6 md:p-8">
      {/* Honeypot — invisible to humans, bots fill it */}
      <input
        ref={honeypot}
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-300">
            Name <span className="text-slate-500">({form.name.length}/{LIMITS.name})</span>
          </label>
          <input
            className={inputCls}
            placeholder="Your name"
            value={form.name}
            onChange={update("name")}
            maxLength={LIMITS.name}
            required
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-300">
            Email <span className="text-slate-500">({form.email.length}/{LIMITS.email})</span>
          </label>
          <input
            type="email"
            className={inputCls}
            placeholder="you@example.com"
            value={form.email}
            onChange={update("email")}
            maxLength={LIMITS.email}
            required
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-300">
          Subject <span className="text-slate-500">({form.subject.length}/{LIMITS.subject})</span>
        </label>
        <input
          className={inputCls}
          placeholder="What is this about?"
          value={form.subject}
          onChange={update("subject")}
          maxLength={LIMITS.subject}
          required
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-300">
          Message <span className="text-slate-500">({form.message.length}/{LIMITS.message})</span>
        </label>
        <textarea
          className={`${inputCls} min-h-[140px] resize-y`}
          placeholder="Tell me about your project, opportunity, or just say hi…"
          value={form.message}
          onChange={update("message")}
          maxLength={LIMITS.message}
          required
        />
      </div>

      {status === "error" && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-xl bg-accent-600 py-3.5 text-sm font-semibold text-white transition hover:bg-accent-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

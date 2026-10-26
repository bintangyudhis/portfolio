import { NextRequest, NextResponse } from "next/server";
import { insertMessage } from "@/lib/db";

// Anti-spam layers (kept from the previous implementation):
// 1. Honeypot field (bots fill it, humans don't see it)
// 2. Time-trap (form submitted too fast = bot)
// 3. Rate limit: max 5 messages / hour / IP (in-memory, per instance)
// 4. Strict character limits + email format validation
// Messages are stored in the Supabase table portfolio_messages.

const LIMITS = { name: 80, email: 120, subject: 120, message: 2000 };
const MIN_SUBMIT_MS = 3000;
const RATE_MAX = 5;
const RATE_WINDOW_MS = 3600_000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const hits = new Map<string, { count: number; reset: number }>();

function rateAllowed(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || rec.reset < now) {
    hits.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    return true;
  }
  rec.count += 1;
  return rec.count <= RATE_MAX;
}

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, subject, message, website, ts } = body as Record<string, unknown>;

  // 1. Honeypot — pretend success, drop silently.
  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // 2. Time-trap
  if (typeof ts !== "number" || Date.now() - ts < MIN_SUBMIT_MS) {
    return NextResponse.json(
      { error: "Please take a moment to write your message before sending." },
      { status: 400 }
    );
  }

  // 4. Validation + limits
  const clean = {
    name: String(name ?? "").trim().slice(0, LIMITS.name),
    email: String(email ?? "").trim().slice(0, LIMITS.email),
    subject: String(subject ?? "").trim().slice(0, LIMITS.subject),
    message: String(message ?? "").trim().slice(0, LIMITS.message),
  };

  if (clean.name.length < 2) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!EMAIL_RE.test(clean.email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (clean.subject.length < 3) {
    return NextResponse.json({ error: "Please enter a subject." }, { status: 400 });
  }
  if (clean.message.length < 10) {
    return NextResponse.json(
      { error: "Your message is too short — please write at least a few words." },
      { status: 400 }
    );
  }

  // 3. Rate limit (after validation so probes don't burn quota)
  const ip = clientIp(req);
  if (!rateAllowed(ip)) {
    return NextResponse.json(
      { error: "You've sent too many messages recently. Please try again later." },
      { status: 429 }
    );
  }

  const stored = await insertMessage({ ...clean, ip });
  if (!stored) {
    return NextResponse.json(
      { error: "Message storage is unavailable right now. Please email me directly." },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true });
}

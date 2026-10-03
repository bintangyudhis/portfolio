import { NextRequest, NextResponse } from "next/server";
import { addMessage, checkRateLimit, newId } from "@/lib/store";
import { ContactMessage } from "@/lib/types";

// Anti-spam layers:
// 1. Honeypot field (bots fill it, humans don't see it)
// 2. Time-trap (form submitted too fast = bot)
// 3. Rate limit: max 5 messages / hour / IP
// 4. Strict character limits + email format validation
// 5. HTML is escaped on render (whitespace-pre-wrap, no dangerouslySetInnerHTML)

const LIMITS = { name: 80, email: 120, subject: 120, message: 2000 };
const MIN_SUBMIT_MS = 3000;
const RATE_MAX = 5;
const RATE_WINDOW_SEC = 3600;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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

  // 1. Honeypot
  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ ok: true }); // pretend success, drop silently
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

  // 3. Rate limit (checked after validation so bots probing limits don't burn quota)
  const ip = clientIp(req);
  const { allowed } = await checkRateLimit(ip, RATE_MAX, RATE_WINDOW_SEC);
  if (!allowed) {
    return NextResponse.json(
      { error: "You've sent too many messages recently. Please try again later." },
      { status: 429 }
    );
  }

  const msg: ContactMessage = {
    ...clean,
    id: newId("msg"),
    ip,
    createdAt: Date.now(),
    read: false,
  };
  await addMessage(msg);

  return NextResponse.json({ ok: true });
}

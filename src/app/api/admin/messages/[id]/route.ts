import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getMessages, saveMessages } from "@/lib/store";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Ctx) {
  if (!(await isAdmin())) return unauthorized();
  const { id } = await params;
  const { read } = await req.json().catch(() => ({}));
  const list = await getMessages();
  const msg = list.find((m) => m.id === id);
  if (!msg) return NextResponse.json({ error: "Not found" }, { status: 404 });
  msg.read = read === true;
  await saveMessages(list);
  return NextResponse.json({ messages: list });
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  if (!(await isAdmin())) return unauthorized();
  const { id } = await params;
  const list = await getMessages();
  const filtered = list.filter((m) => m.id !== id);
  if (filtered.length === list.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await saveMessages(filtered);
  return NextResponse.json({ messages: filtered });
}

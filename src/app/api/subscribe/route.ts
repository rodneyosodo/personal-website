import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  let body: { email?: unknown; source?: unknown; subject?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { email } = body;
  if (typeof email !== "string") {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const normalized = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 },
    );
  }

  const metadata = JSON.stringify({
    source: typeof body.source === "string" ? body.source : "subscribe",
    subject: typeof body.subject === "string" ? body.subject : null,
  });

  await db().run(
    `
      INSERT INTO subscribers (email, status, metadata)
      VALUES (?, 'active', ?)
      ON CONFLICT(email) DO UPDATE SET
        status = 'active',
        unsubscribed_at = NULL,
        updated_at = datetime('now'),
        metadata = excluded.metadata
      WHERE subscribers.status = 'unsubscribed'
    `,
    normalized,
    metadata,
  );

  return NextResponse.json({ ok: true });
}

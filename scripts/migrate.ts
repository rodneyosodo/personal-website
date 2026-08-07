import { connect } from "@tursodatabase/serverless";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  console.error(
    "Missing Turso credentials: set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN",
  );
  process.exit(1);
}

const statements = [
  `CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    unsubscribed_at TEXT,
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    metadata TEXT NOT NULL DEFAULT '{}'
  );`,
  "CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status);",
];

const db = connect({ url, authToken });
await db.batch(statements, "immediate");
await db.close();

console.log("Migration complete.");

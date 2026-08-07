import { type Connection, connect } from "@tursodatabase/serverless";

let client: Connection | null = null;

export function db(): Connection {
  if (client) return client;

  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    throw new Error(
      "Missing Turso credentials: set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN",
    );
  }

  client = connect({ url, authToken });
  return client;
}

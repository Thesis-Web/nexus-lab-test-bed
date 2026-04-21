import crypto from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { Client } from "pg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(__dirname, "../..");

export async function readJson(relativePath) {
  const fullPath = path.join(repoRoot, relativePath);
  const text = await readFile(fullPath, "utf8");
  return JSON.parse(text);
}

export async function sha256OfFile(relativePath) {
  const fullPath = path.join(repoRoot, relativePath);
  const bytes = await readFile(fullPath);
  return crypto.createHash("sha256").update(bytes).digest("hex");
}

export async function createClient() {
  const client = new Client({
    host: process.env.LAB_POSTGRES_HOST ?? "127.0.0.1",
    port: Number(process.env.LAB_POSTGRES_PORT ?? "54329"),
    user: process.env.LAB_POSTGRES_USER,
    password: process.env.LAB_POSTGRES_PASSWORD,
    database: process.env.LAB_POSTGRES_DB,
  });
  await client.connect();
  return client;
}

export async function withSeedHistory(client, manifestId, manifestVersion, fn) {
  await client.query(
    `INSERT INTO seed_history (manifest_id, manifest_version, status, detail)
     VALUES ($1, $2, 'started', $3::jsonb)`,
    [manifestId, manifestVersion, JSON.stringify({ source: "node-loader" })],
  );

  try {
    const result = await fn();
    await client.query(
      `INSERT INTO seed_history (manifest_id, manifest_version, status, detail)
       VALUES ($1, $2, 'completed', $3::jsonb)`,
      [manifestId, manifestVersion, JSON.stringify(result ?? {})],
    );
  } catch (error) {
    await client.query(
      `INSERT INTO seed_history (manifest_id, manifest_version, status, detail)
       VALUES ($1, $2, 'failed', $3::jsonb)`,
      [manifestId, manifestVersion, JSON.stringify({ error: String(error) })],
    );
    throw error;
  }
}

export async function upsertByColumns(client, tableName, rows, config) {
  const { keyColumns, allColumns, updateColumns } = config;
  for (const row of rows) {
    const values = allColumns.map((column) => row[column] ?? null);
    const placeholders = allColumns
      .map((_, index) => `$${index + 1}`)
      .join(", ");
    const updateSet = updateColumns
      .map((column) => `${column} = EXCLUDED.${column}`)
      .concat(config.touchUpdatedAt ? ["updated_at = NOW()"] : [])
      .join(", ");
    const sql = `INSERT INTO ${tableName} (${allColumns.join(", ")})
      VALUES (${placeholders})
      ON CONFLICT (${keyColumns.join(", ")})
      DO UPDATE SET ${updateSet}`;
    await client.query(sql, values);
  }
}

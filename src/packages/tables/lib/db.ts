// Database connection and utility functions.
// Private — only the package entry point exports these.

import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

import * as schema from "./schema";

export type TablesSchema = typeof schema;

const DB_PATH = process.env.DB_PATH ?? "poker-shield.db";

let _db: ReturnType<typeof createDb> | null = null;

export function getDb() {
  if (!_db) {
    _db = createDb(DB_PATH);
  }
  return _db;
}

export function createDb(path: string) {
  const sqlite = new Database(path);
  sqlite.pragma("journal_mode = WAL");
  return drizzle(sqlite, { schema });
}

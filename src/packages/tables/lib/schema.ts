// Database schema for poker-shield (SQLite).
// This is PRIVATE — lives in lib/. Only our package's entry point exports it.

import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

function uid() {
  return crypto.randomUUID();
}

function now() {
  return new Date().toISOString();
}

// --- Tenants (multi-tenant) ---
export const tenants = sqliteTable("tenants", {
  id: text("id").primaryKey().$defaultFn(uid),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: text("created_at").notNull().$defaultFn(now),
  updatedAt: text("updated_at").notNull().$defaultFn(now),
});

// --- Users (within a tenant) ---
export const users = sqliteTable("users", {
  id: text("id").primaryKey().$defaultFn(uid),
  tenantId: text("tenant_id").notNull().references(() => tenants.id),
  email: text("email").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("viewer"),
  createdAt: text("created_at").notNull().$defaultFn(now),
});

// --- Tables (poker tables) ---
export const tables = sqliteTable("tables", {
  id: text("id").primaryKey().$defaultFn(uid),
  tenantId: text("tenant_id").notNull().references(() => tenants.id),
  name: text("name").notNull(),
  gameType: text("game_type").notNull(), // "texas-holdem" | "omaha" | "stud"
  stakes: text("stakes").notNull(), // e.g. "1/2", "2/5"
  handsPlayed: integer("hands_played").notNull().default(0),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().$defaultFn(now),
});

// --- Players (on a table) ---
export const players = sqliteTable("players", {
  id: text("id").primaryKey().$defaultFn(uid),
  tableId: text("table_id").notNull().references(() => tables.id),
  alias: text("alias").notNull(),
  handsPlayed: integer("hands_played").notNull().default(0),
  suspiciousScore: integer("suspicious_score").notNull().default(0),
  isFlagged: integer("is_flagged", { mode: "boolean" }).notNull().default(false),
  lastActive: text("last_active").notNull().$defaultFn(now),
  createdAt: text("created_at").notNull().$defaultFn(now),
});

// --- Hands (individual hands played) ---
export const hands = sqliteTable("hands", {
  id: text("id").primaryKey().$defaultFn(uid),
  tableId: text("table_id").notNull().references(() => tables.id),
  playerId: text("player_id").notNull().references(() => players.id),
  handNumber: integer("hand_number").notNull(),
  action: text("action").notNull(), // "fold" | "check" | "call" | "raise" | "all-in"
  betAmount: integer("bet_amount").default(0),
  winAmount: integer("win_amount").default(0),
  isSuspicious: integer("is_suspicious", { mode: "boolean" }).notNull().default(false),
  timestamp: text("timestamp").notNull().$defaultFn(now),
});

// --- Alerts ---
export const alerts = sqliteTable("alerts", {
  id: text("id").primaryKey().$defaultFn(uid),
  tenantId: text("tenant_id").notNull().references(() => tenants.id),
  playerId: text("player_id").notNull().references(() => players.id),
  type: text("type").notNull(), // "bot-detected" | "multi-accounting" | "collusion" | "pattern-deviance" | "manual"
  severity: text("severity").notNull(), // "low" | "medium" | "high" | "critical"
  description: text("description").notNull(),
  isResolved: integer("is_resolved", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").notNull().$defaultFn(now),
});

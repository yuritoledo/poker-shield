// Database schema for poker-shield.
// This is PRIVATE — lives in lib/. Only our package's entry point exports it.

import { pgTable, text, timestamp, uuid, integer, boolean, jsonb } from "drizzle-orm/pg-core";

// --- Tenants (multi-tenant) ---
export const tenants = pgTable("tenants", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// --- Users (within a tenant) ---
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
  email: text("email").notNull(),
  name: text("name").notNull(),
  role: text("role", { enum: ["admin", "operator", "viewer"] }).notNull().default("viewer"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// --- Tables (poker tables) ---
export const tables = pgTable("tables", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
  name: text("name").notNull(),
  gameType: text("game_type", { enum: ["texas-holdem", "omaha", "stud"] }).notNull(),
  stakes: text("stakes").notNull(), // e.g. "1/2", "2/5"
  handsPlayed: integer("hands_played").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// --- Players (on a table) ---
export const players = pgTable("players", {
  id: uuid("id").primaryKey().defaultRandom(),
  tableId: uuid("table_id").notNull().references(() => tables.id),
  alias: text("alias").notNull(),
  handsPlayed: integer("hands_played").notNull().default(0),
  suspiciousScore: integer("suspicious_score").notNull().default(0),
  isFlagged: boolean("is_flagged").notNull().default(false),
  lastActive: timestamp("last_active").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// --- Hands (individual hands played) ---
export const hands = pgTable("hands", {
  id: uuid("id").primaryKey().defaultRandom(),
  tableId: uuid("table_id").notNull().references(() => tables.id),
  playerId: uuid("player_id").notNull().references(() => players.id),
  handNumber: integer("hand_number").notNull(),
  action: text("action", {
    enum: ["fold", "check", "call", "raise", "all-in"],
  }).notNull(),
  betAmount: integer("bet_amount").default(0),
  winAmount: integer("win_amount").default(0),
  isSuspicious: boolean("is_suspicious").notNull().default(false),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// --- Alerts ---
export const alerts = pgTable("alerts", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id").notNull().references(() => tenants.id),
  playerId: uuid("player_id").notNull().references(() => players.id),
  type: text("type", {
    enum: ["bot-detected", "multi-accounting", "collusion", "pattern-deviance", "manual"],
  }).notNull(),
  severity: text("severity", { enum: ["low", "medium", "high", "critical"] }).notNull(),
  description: text("description").notNull(),
  isResolved: boolean("is_resolved").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

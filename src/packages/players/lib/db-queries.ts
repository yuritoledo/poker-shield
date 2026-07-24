// DB-backed data access for players (server-only).
// Auto-seeds from mock data on first query.

import { eq, sql } from "drizzle-orm";
import { getDb } from "@/packages/tables";
import * as schema from "@/packages/tables/lib/schema";
import type { PlayerRow } from "./types";

let seeded = false;

function seedDb(): void {
  if (seeded) return;
  const db = getDb();

  const existing = db.select({ id: schema.tenants.id }).from(schema.tenants).get();
  if (existing) {
    seeded = true;
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { mockPlayers } = require("./mock-data") as { mockPlayers: PlayerRow[] };

  const tenantId = "demo-tenant-0001";

  db.insert(schema.tenants).values({ id: tenantId, name: "Demo Casino", slug: "demo" }).run();

  const tableNames = [...new Set(mockPlayers.map((p) => p.tableName))];
  for (let i = 0; i < tableNames.length; i++) {
    const name = tableNames[i];
    const sample = mockPlayers.find((p) => p.tableName === name)!;
    db.insert(schema.tables)
      .values({
        id: sample.tableId,
        tenantId,
        name,
        gameType: "texas-holdem",
        stakes: "1/2",
        handsPlayed: 0,
        isActive: true,
      })
      .run();
  }

  for (const p of mockPlayers) {
    db.insert(schema.players)
      .values({
        id: p.id,
        tableId: p.tableId,
        alias: p.alias,
        handsPlayed: p.handsPlayed,
        suspiciousScore: p.suspiciousScore,
        isFlagged: p.isFlagged,
        lastActive: p.lastActive,
      })
      .run();
  }

  seeded = true;
}

/** Get all players. */
export function getPlayersFromDb(): PlayerRow[] {
  seedDb();
  const db = getDb();

  const rows = db
    .select({
      id: schema.players.id,
      alias: schema.players.alias,
      tableId: schema.players.tableId,
      tableName: sql<string>`COALESCE(${schema.tables.name}, '')`.as("tableName"),
      handsPlayed: schema.players.handsPlayed,
      suspiciousScore: schema.players.suspiciousScore,
      isFlagged: schema.players.isFlagged,
      lastActive: schema.players.lastActive,
    })
    .from(schema.players)
    .leftJoin(schema.tables, eq(schema.players.tableId, schema.tables.id))
    .all();

  return rows as PlayerRow[];
}

/** Toggle a player's flagged status. */
export function flagPlayerInDb(id: string): void {
  const db = getDb();
  const current = db
    .select({ isFlagged: schema.players.isFlagged })
    .from(schema.players)
    .where(eq(schema.players.id, id))
    .get();

  if (current) {
    db.update(schema.players)
      .set({ isFlagged: !current.isFlagged })
      .where(eq(schema.players.id, id))
      .run();
  }
}

/** Adjust a player's suspicious score. */
export function adjustScoreInDb(id: string, delta: number): void {
  const db = getDb();
  const current = db
    .select({ score: schema.players.suspiciousScore })
    .from(schema.players)
    .where(eq(schema.players.id, id))
    .get();

  if (current) {
    const newScore = Math.max(0, Math.min(100, current.score + delta));
    db.update(schema.players)
      .set({ suspiciousScore: newScore })
      .where(eq(schema.players.id, id))
      .run();
  }
}

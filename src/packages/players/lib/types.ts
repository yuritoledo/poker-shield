// View-model types for the Players directory.
// Decoupled from the Drizzle ORM schema — the UI never imports from the ORM.

export type { AlertType, AlertSeverity, PlayerAlert } from "@/packages/alerts";

/** A player row as shown in the directory list. */
export interface PlayerRow {
  id: string;
  alias: string;
  tableId: string;
  tableName: string;
  handsPlayed: number;
  suspiciousScore: number;
  isFlagged: boolean;
  lastActive: string; // ISO date
}


/** Filter state for the player directory. */
export interface PlayerFilters {
  scoreMin: number | null;
  scoreMax: number | null;
  dateFrom: string | null;
  dateTo: string | null;
}

/** A single play session at a table. */
export interface PlayerSession {
  tableId: string;
  tableName: string;
  gameType: string;
  handsPlayed: number;
  buyIn: number;
  netResult: number;
  startedAt: string; // ISO date
  endedAt: string; // ISO date
}

/** A recorded score change for the timeline. */
export interface ScoreChange {
  timestamp: string; // ISO date
  previousScore: number;
  newScore: number;
  reason: string;
}

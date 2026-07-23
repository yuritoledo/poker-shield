// View-model types for the Players directory.
// Decoupled from the Drizzle ORM schema — the UI never imports from the ORM.

export type AlertType =
  | "bot-detected"
  | "multi-accounting"
  | "collusion"
  | "pattern-deviance"
  | "manual";

export type AlertSeverity = "low" | "medium" | "high" | "critical";

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

/** An alert attached to a player (shown in expanded row). */
export interface PlayerAlert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  description: string;
  createdAt: string; // ISO date
}

/** Filter state for the player directory. */
export interface PlayerFilters {
  scoreMin: number | null;
  scoreMax: number | null;
  dateFrom: string | null;
  dateTo: string | null;
}

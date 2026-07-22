// View-model types for the Tables Dashboard.
// Decoupled from the Drizzle ORM schema — the UI never imports from the ORM.

export type GameType = "texas-holdem" | "omaha" | "stud";

export type TableStatus = "active" | "inactive";

/** A table row as shown in the dashboard list. */
export interface TableRow {
  id: string;
  name: string;
  gameType: GameType;
  stakes: string;
  status: TableStatus;
  handsPlayed: number;
  playerCount: number;
  flaggedPlayerCount: number;
}

/** Filter state for the table list. */
export interface TableFilters {
  gameType: GameType | "all";
  stakes: string | "all";
  status: TableStatus | "all";
}

/** Callback when the operator toggles a table's active status. */
export type TableToggleAction = (tableId: string) => void;

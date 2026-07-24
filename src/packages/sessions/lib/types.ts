// Types for the Session History package.

export interface Session {
  id: string;
  tableName: string;
  gameType: string;
  stakes: string;
  startedAt: string;
  duration: string;
  handsPlayed: number;
  totalRevenue: number;
  playerCount: number;
  status: "active" | "completed";
}

export interface SessionStats {
  totalSessions: number;
  totalHands: number;
  totalRevenue: number;
  avgDuration: string;
}

export type SessionSortField = "startedAt" | "handsPlayed" | "totalRevenue";
export type SortDirection = "asc" | "desc";

export interface SessionFilters {
  gameType: string;
  status: string;
  sortField: SessionSortField;
  sortDirection: SortDirection;
}

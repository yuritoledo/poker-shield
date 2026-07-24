// Entry point for the Session History package.
// App code imports from here, never from lib/.

export { SessionsHistory } from "./lib/sessions-history";
export type { SessionsHistoryProps } from "./lib/sessions-history";
export { SessionStatsBar } from "./lib/session-stats-bar";
export { SessionTable } from "./lib/session-table";
export {
  getSessionStats,
  getSessions,
  AVAILABLE_GAME_TYPES,
} from "./lib/mock-data";
export type {
  Session,
  SessionStats,
  SessionFilters,
  SessionSortField,
  SortDirection,
} from "./lib/types";

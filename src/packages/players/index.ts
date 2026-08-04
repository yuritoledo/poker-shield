// Entry point for the players package.
// Public API — outside code imports from here, never from lib/.

export type { PlayerRow, PlayerFilters, PlayerAlert, AlertType, AlertSeverity, PlayerSession, ScoreChange } from "./lib/types";
export { mockPlayers } from "./lib/mock-data";
export { PlayersDirectory } from "./lib/players-directory";
export { PlayersFilterBar } from "./lib/players-filter-bar";
export { filterPlayers } from "./lib/filtering";
export { getPlayers, flagPlayer, adjustScore, subscribe, resetStore } from "./lib/mock-store";
export { fetchPlayers, apiFlagPlayer, apiAdjustScore } from "./lib/api";
export { usePlayersQuery, invalidatePlayersQuery } from "./lib/use-players-query";

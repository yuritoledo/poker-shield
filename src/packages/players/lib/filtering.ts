import type { PlayerFilters, PlayerRow } from "./types";

/** AND-combined client-side filter. Null values mean no filter. */
export function filterPlayers(
  players: PlayerRow[],
  filters: PlayerFilters,
): PlayerRow[] {
  return players.filter((p) => {
    if (filters.scoreMin !== null && p.suspiciousScore < filters.scoreMin)
      return false;
    if (filters.scoreMax !== null && p.suspiciousScore > filters.scoreMax)
      return false;
    if (filters.dateFrom !== null && p.lastActive < filters.dateFrom)
      return false;
    if (filters.dateTo !== null && p.lastActive > filters.dateTo) return false;
    return true;
  });
}

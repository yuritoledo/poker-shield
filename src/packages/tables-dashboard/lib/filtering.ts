import type { TableFilters, TableRow } from "./types";

/** AND-combined client-side filter. Each dimension is optional — "all" means no filter. */
export function applyFilters(tables: TableRow[], filters: TableFilters): TableRow[] {
  return tables.filter((t) => {
    if (filters.gameType !== "all" && t.gameType !== filters.gameType) return false;
    if (filters.status !== "all" && t.status !== filters.status) return false;
    if (filters.stakes !== "all" && t.stakes !== filters.stakes) return false;
    return true;
  });
}

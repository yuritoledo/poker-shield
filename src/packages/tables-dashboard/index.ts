// Entry point for the tables-dashboard package.
// Public API — outside code imports from here, never from lib/.

export type { TableRow, TableFilters, GameType, TableStatus, TableToggleAction } from "./lib/types";
export { mockTables } from "./lib/mock-data";
export { TablesDashboard } from "./lib/tables-dashboard";
export { TablesFilterBar } from "./lib/tables-filter-bar";
export { applyFilters } from "./lib/filtering";
export { getTables, toggleTable, subscribe } from "./lib/mock-store";
export { fetchTables, apiToggleTable } from "./lib/api";
export { useTablesQuery, TABLES_QUERY_KEY } from "./lib/use-tables-query";
export { useToggleTableMutation } from "./lib/use-toggle-table-mutation";

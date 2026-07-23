"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import {
  TablesDashboard,
  TablesFilterBar,
  applyFilters,
  getTables,
  toggleTable,
  subscribe,
} from "@/packages/tables-dashboard";
import type { TableFilters } from "@/packages/tables-dashboard";

export default function TablesPage() {
  const tables = useSyncExternalStore(subscribe, getTables, getTables);
  const [filters, setFilters] = useState<TableFilters>({
    gameType: "all",
    stakes: "all",
    status: "all",
  });

  const filteredTables = useMemo(
    () => applyFilters(tables, filters),
    [tables, filters],
  );

  const availableStakes = useMemo(
    () => [...new Set(tables.map((t) => t.stakes))].sort(),
    [tables],
  );

  return (
    <div className="space-y-4">
      <TablesFilterBar
        filters={filters}
        availableStakes={availableStakes}
        onChange={setFilters}
      />
      <TablesDashboard
        tables={filteredTables}
        onToggle={(id) => {
          toggleTable(id);
        }}
      />
    </div>
  );
}

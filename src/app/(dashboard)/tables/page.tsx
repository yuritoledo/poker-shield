"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { Table2, Activity, Flag } from "lucide-react";
import {
  TablesDashboard,
  TablesFilterBar,
  applyFilters,
  getTables,
  toggleTable,
  subscribe,
} from "@/packages/tables-dashboard";
import type { TableFilters } from "@/packages/tables-dashboard";
import { Card, CardContent } from "@/components/ui/card";

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

  const activeTables = useMemo(
    () => tables.filter((t) => t.status === "active"),
    [tables],
  );

  const flaggedPlayersTotal = useMemo(
    () => tables.reduce((sum, t) => sum + t.flaggedPlayerCount, 0),
    [tables],
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Table2 className="size-5" />
            </div>
            <div>
              <p className="font-mono text-lg leading-none font-semibold tabular-nums text-foreground">
                {tables.length}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Total Tables</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
              <Activity className="size-5" />
            </div>
            <div>
              <p className="font-mono text-lg leading-none font-semibold tabular-nums text-foreground">
                {activeTables.length}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Active Tables</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-rose-500/10 text-rose-500">
              <Flag className="size-5" />
            </div>
            <div>
              <p className="font-mono text-lg leading-none font-semibold tabular-nums text-foreground">
                {flaggedPlayersTotal}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Flagged Players</p>
            </div>
          </CardContent>
        </Card>
      </div>

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

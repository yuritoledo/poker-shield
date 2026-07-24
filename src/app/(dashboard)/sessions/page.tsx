"use client";

import { useMemo, useState } from "react";
import {
  SessionsHistory,
  getSessionStats,
  getSessions,
  AVAILABLE_GAME_TYPES,
} from "@/packages/sessions";
import type { SessionFilters } from "@/packages/sessions";

export default function SessionsPage() {
  const stats = useMemo(() => getSessionStats(), []);
  const sessions = useMemo(() => getSessions(), []);
  const [filters, setFilters] = useState<SessionFilters>({
    gameType: "all",
    status: "all",
    sortField: "startedAt",
    sortDirection: "desc",
  });

  const filtered = useMemo(() => {
    let result = [...sessions];
    if (filters.gameType !== "all") {
      result = result.filter((s) => s.gameType === filters.gameType);
    }
    if (filters.status !== "all") {
      result = result.filter((s) => s.status === filters.status);
    }
    result.sort((a, b) => {
      const dir = filters.sortDirection === "asc" ? 1 : -1;
      if (filters.sortField === "startedAt") {
        // ponytail: naive string compare for mock dates — fine until real timestamps arrive
        return a.startedAt.localeCompare(b.startedAt) * dir;
      }
      const aVal = a[filters.sortField];
      const bVal = b[filters.sortField];
      return (aVal - bVal) * dir;
    });
    return result;
  }, [sessions, filters]);

  return (
    <SessionsHistory
      sessions={filtered}
      stats={stats}
      filters={filters}
      availableGameTypes={AVAILABLE_GAME_TYPES}
      onFiltersChange={setFilters}
    />
  );
}

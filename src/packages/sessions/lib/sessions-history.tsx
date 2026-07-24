// Session History page — layout assembling stats bar + filters + table.
// Presentational: receives data and callbacks as props.

import { SessionStatsBar } from "./session-stats-bar";
import { SessionTable } from "./session-table";
import type {
  Session,
  SessionStats,
  SessionFilters,
} from "./types";

export interface SessionsHistoryProps {
  sessions: Session[];
  stats: SessionStats;
  filters: SessionFilters;
  availableGameTypes: string[];
  onFiltersChange: (filters: SessionFilters) => void;
}

export function SessionsHistory({
  sessions,
  stats,
  filters,
  availableGameTypes,
  onFiltersChange,
}: SessionsHistoryProps) {
  return (
    <div className="space-y-4">
      <SessionStatsBar stats={stats} />
      <SessionTable
        sessions={sessions}
        filters={filters}
        onFiltersChange={onFiltersChange}
      />
    </div>
  );
}

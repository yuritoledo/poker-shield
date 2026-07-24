// Session history table with inline detail rows — presentational.

"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type {
  Session,
  SessionFilters,
  SessionSortField,
  SortDirection,
} from "./types";

export interface SessionTableProps {
  sessions: Session[];
  filters: SessionFilters;
  onFiltersChange: (filters: SessionFilters) => void;
}

export function SessionTable({
  sessions,
  filters,
  onFiltersChange,
}: SessionTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function toggleSort(field: SessionSortField) {
    if (filters.sortField === field) {
      onFiltersChange({
        ...filters,
        sortDirection: filters.sortDirection === "asc" ? "desc" : "asc",
      });
    } else {
      onFiltersChange({ ...filters, sortField: field, sortDirection: "desc" });
    }
  }

  function SortIcon({ field }: { field: SessionSortField }) {
    if (filters.sortField !== field) return <ArrowUpDown className="size-3" />;
    return filters.sortDirection === "asc" ? (
      <ArrowUp className="size-3" />
    ) : (
      <ArrowDown className="size-3" />
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-sm text-muted-foreground">No sessions found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-sidebar-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-sidebar-border bg-sidebar text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <th className="px-4 py-3 w-8" />
            <th className="px-4 py-3">Session</th>
            <th className="px-4 py-3">Table</th>
            <th className="px-4 py-3">Game</th>
            <th className="px-4 py-3">Stakes</th>
            <th className="px-4 py-3">Players</th>
            <th
              className="cursor-pointer px-4 py-3 select-none"
              onClick={() => toggleSort("startedAt")}
            >
              <span className="inline-flex items-center gap-1">
                Date <SortIcon field="startedAt" />
              </span>
            </th>
            <th
              className="cursor-pointer px-4 py-3 select-none"
              onClick={() => toggleSort("handsPlayed")}
            >
              <span className="inline-flex items-center gap-1">
                Hands <SortIcon field="handsPlayed" />
              </span>
            </th>
            <th
              className="cursor-pointer px-4 py-3 text-right select-none"
              onClick={() => toggleSort("totalRevenue")}
            >
              <span className="inline-flex items-center gap-1">
                Revenue <SortIcon field="totalRevenue" />
              </span>
            </th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-sidebar-border">
          {sessions.map((s) => (
            <tr key={s.id} className="group hover:bg-sidebar/50">
              <td className="px-4 py-3">
                <button
                  onClick={() =>
                    setExpandedId(expandedId === s.id ? null : s.id)
                  }
                  className="text-muted-foreground hover:text-foreground"
                >
                  {expandedId === s.id ? (
                    <ChevronUp className="size-4" />
                  ) : (
                    <ChevronDown className="size-4" />
                  )}
                </button>
              </td>
              <td className="px-4 py-3 font-medium text-foreground">
                {s.id}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {s.tableName}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {s.gameType}
              </td>
              <td className="px-4 py-3 text-muted-foreground">{s.stakes}</td>
              <td className="px-4 py-3 text-muted-foreground">
                {s.playerCount}
              </td>
              <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                {s.startedAt}
              </td>
              <td className="px-4 py-3 font-mono tabular-nums text-muted-foreground">
                {s.handsPlayed}
              </td>
              <td className="px-4 py-3 font-mono tabular-nums text-right text-foreground">
                ${s.totalRevenue.toLocaleString()}
              </td>
              <td className="px-4 py-3">
                <Badge
                  variant={s.status === "active" ? "default" : "secondary"}
                  className={
                    s.status === "active"
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "text-muted-foreground"
                  }
                >
                  {s.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

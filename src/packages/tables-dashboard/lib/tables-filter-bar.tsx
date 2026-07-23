"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";
import type { TableFilters, GameType, TableStatus } from "./types";

const GAME_TYPES: { value: GameType | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "texas-holdem", label: "Texas Hold'em" },
  { value: "omaha", label: "Omaha" },
  { value: "stud", label: "Stud" },
];

const STATUSES: { value: TableStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export interface TablesFilterBarProps {
  filters: TableFilters;
  availableStakes: string[];
  onChange: (filters: TableFilters) => void;
}

export function TablesFilterBar(props: TablesFilterBarProps) {
  const { filters, availableStakes, onChange } = props;
  function set(key: keyof TableFilters, value: string) {
    onChange({ ...filters, [key]: value });
  }
  function onStakesChange(v: string | null) {
    set("stakes", v || "all");
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </span>

      <Select
        value={filters.gameType}
        onValueChange={(v) => set("gameType", v as GameType | "all")}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {GAME_TYPES.map((g) => (
            <SelectItem key={g.value} value={g.value}>
              {g.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.stakes}
        onValueChange={onStakesChange}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {availableStakes.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.status}
        onValueChange={(v) => set("status", v as TableStatus | "all")}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {STATUSES.map((s) => (
            <SelectItem key={s.value} value={s.value}>
              {s.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

"use client";

import { SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { PlayerFilters } from "./types";

export interface PlayersFilterBarProps {
  filters: PlayerFilters;
  onChange: (filters: PlayerFilters) => void;
}

export function PlayersFilterBar(props: PlayersFilterBarProps) {
  const { filters, onChange } = props;

  function set<K extends keyof PlayerFilters>(
    key: K,
    value: PlayerFilters[K],
  ) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div className="flex flex-wrap items-end gap-4">
      <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </span>

      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-medium text-muted-foreground">
          Min Score
        </label>
        <Input
          type="number"
          min={0}
          max={100}
          placeholder="0"
          className="h-8 w-20"
          value={filters.scoreMin ?? ""}
          onChange={(e) =>
            set(
              "scoreMin",
              e.target.value === "" ? null : Number(e.target.value),
            )
          }
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-medium text-muted-foreground">
          Max Score
        </label>
        <Input
          type="number"
          min={0}
          max={100}
          placeholder="100"
          className="h-8 w-20"
          value={filters.scoreMax ?? ""}
          onChange={(e) =>
            set(
              "scoreMax",
              e.target.value === "" ? null : Number(e.target.value),
            )
          }
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-medium text-muted-foreground">
          From Date
        </label>
        <Input
          type="date"
          className="h-8 w-40"
          value={filters.dateFrom ?? ""}
          onChange={(e) =>
            set("dateFrom", e.target.value || null)
          }
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-medium text-muted-foreground">
          To Date
        </label>
        <Input
          type="date"
          className="h-8 w-40"
          value={filters.dateTo ?? ""}
          onChange={(e) =>
            set("dateTo", e.target.value || null)
          }
        />
      </div>
    </div>
  );
}

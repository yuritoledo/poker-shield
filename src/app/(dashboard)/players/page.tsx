"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import {
  PlayersDirectory,
  PlayersFilterBar,
  filterPlayers,
  getPlayers,
  flagPlayer,
  adjustScore,
  subscribe,
} from "@/packages/players";
import type { PlayerFilters } from "@/packages/players";

export default function PlayersPage() {
  const players = useSyncExternalStore(subscribe, getPlayers, getPlayers);
  const [filters, setFilters] = useState<PlayerFilters>({
    scoreMin: null,
    scoreMax: null,
    dateFrom: null,
    dateTo: null,
  });

  const filteredPlayers = useMemo(
    () => filterPlayers(players, filters),
    [players, filters],
  );

  return (
    <div className="space-y-4">
      <PlayersFilterBar filters={filters} onChange={setFilters} />
      <PlayersDirectory
        players={filteredPlayers}
        onFlagToggle={(id) => flagPlayer(id)}
        onScoreAdjust={(id, delta) => adjustScore(id, delta)}
      />
    </div>
  );
}

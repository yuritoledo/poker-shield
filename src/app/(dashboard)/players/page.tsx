"use client";

import { useMemo, useState } from "react";
import {
  PlayersDirectory,
  PlayersFilterBar,
  filterPlayers,
  usePlayersQuery,
  useFlagPlayerMutation,
  useAdjustScoreMutation,
} from "@/packages/players";
import type { PlayerFilters } from "@/packages/players";

export default function PlayersPage() {
  const flagMutation = useFlagPlayerMutation();
  const scoreMutation = useAdjustScoreMutation();
  const {
    data: players,
    isLoading,
    isError,
    refetch,
  } = usePlayersQuery();
  const [filters, setFilters] = useState<PlayerFilters>({
    scoreMin: null,
    scoreMax: null,
    dateFrom: null,
    dateTo: null,
  });

  const filteredPlayers = useMemo(
    () => filterPlayers(players ?? [], filters),
    [players, filters],
  );

  function handleFlagToggle(id: string) {
    flagMutation.mutate(id);
  }

  function handleScoreAdjust(id: string, delta: number) {
    scoreMutation.mutate({ playerId: id, delta });
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-sm text-muted-foreground">Loading players…</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <p className="text-sm text-destructive">Failed to load players.</p>
        <button
          onClick={() => refetch()}
          className="text-sm underline text-muted-foreground hover:text-foreground"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <PlayersFilterBar filters={filters} onChange={setFilters} />
      <PlayersDirectory
        players={filteredPlayers}
        onFlagToggle={handleFlagToggle}
        onScoreAdjust={handleScoreAdjust}
      />
    </div>
  );
}

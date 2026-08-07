"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { usePlayersQuery, useFlagPlayerMutation, useAdjustScoreMutation } from "@/packages/players";
import { PlayerDetail } from "@/packages/players/lib/player-detail";
import { mockSessions, mockScoreChanges } from "@/packages/players/lib/mock-detail-data";

export default function PlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const flagMutation = useFlagPlayerMutation();
  const scoreMutation = useAdjustScoreMutation();
  const { data: players, isLoading, isError, refetch } = usePlayersQuery();

  const player = players?.find((p) => p.id === id);

  function handleFlagToggle(playerId: string) {
    flagMutation.mutate(playerId);
  }

  function handleScoreAdjust(playerId: string, delta: number) {
    scoreMutation.mutate({ playerId, delta });
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-sm text-muted-foreground">Loading player…</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <p className="text-sm text-destructive">Failed to load player.</p>
        <button
          onClick={() => refetch()}
          className="text-sm underline text-muted-foreground hover:text-foreground"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <p className="text-sm text-muted-foreground">Player not found.</p>
        <Link
          href="/players"
          className="text-sm underline text-muted-foreground hover:text-foreground"
        >
          Back to directory
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/players"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to directory
      </Link>

      <PlayerDetail
        player={player}
        sessions={mockSessions[player.id] ?? []}
        scoreChanges={mockScoreChanges[player.id] ?? []}
        onFlagToggle={handleFlagToggle}
        onScoreAdjust={handleScoreAdjust}
      />
    </div>
  );
}

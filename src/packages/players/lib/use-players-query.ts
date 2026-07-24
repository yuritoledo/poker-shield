import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { PlayerRow } from "./types";

export const PLAYERS_QUERY_KEY = ["players"] as const;

async function fetchPlayers(): Promise<PlayerRow[]> {
  const res = await fetch("/api/players");
  if (!res.ok) throw new Error("Failed to fetch players");
  return res.json();
}

/**
 * TanStack Query hook for player data.
 * Polls every 30s via the `/api/players` endpoint.
 */
export function usePlayersQuery() {
  return useQuery({
    queryKey: PLAYERS_QUERY_KEY,
    queryFn: fetchPlayers,
    refetchInterval: 30_000,
  });
}

export function invalidatePlayersQuery(
  queryClient: ReturnType<typeof useQueryClient>,
) {
  return queryClient.invalidateQueries({ queryKey: PLAYERS_QUERY_KEY });
}

/** Server-bound player mutations. */
export async function apiFlagPlayer(playerId: string) {
  await fetch("/api/players", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "flag", playerId }),
  });
}

export async function apiAdjustScore(playerId: string, delta: number) {
  await fetch("/api/players", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "adjust-score", playerId, delta }),
  });
}

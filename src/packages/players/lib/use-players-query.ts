import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPlayers } from "./api";

export const PLAYERS_QUERY_KEY = ["players"] as const;

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

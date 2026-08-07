import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiAdjustScore } from "./api";
import { PLAYERS_QUERY_KEY } from "./use-players-query";

export function useAdjustScoreMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ playerId, delta }: { playerId: string; delta: number }) =>
      apiAdjustScore(playerId, delta),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: PLAYERS_QUERY_KEY });
    },
  });
}

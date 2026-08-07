import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFlagPlayer } from "./api";
import { PLAYERS_QUERY_KEY } from "./use-players-query";

export function useFlagPlayerMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiFlagPlayer,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: PLAYERS_QUERY_KEY });
    },
  });
}

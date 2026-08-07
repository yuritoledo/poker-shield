import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiToggleTable } from "./api";
import { TABLES_QUERY_KEY } from "./use-tables-query";

export function useToggleTableMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiToggleTable,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: TABLES_QUERY_KEY });
    },
  });
}

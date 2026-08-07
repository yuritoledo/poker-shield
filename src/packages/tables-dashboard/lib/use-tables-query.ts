import { useQuery } from "@tanstack/react-query";
import { fetchTables } from "./api";

export const TABLES_QUERY_KEY = ["tables"] as const;

export function useTablesQuery() {
  return useQuery({
    queryKey: TABLES_QUERY_KEY,
    queryFn: fetchTables,
    refetchInterval: 30_000,
  });
}

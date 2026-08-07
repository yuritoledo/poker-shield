import type { TableRow } from "./types";

export async function fetchTables(): Promise<TableRow[]> {
  const res = await fetch("/api/tables");
  if (!res.ok) throw new Error("Failed to fetch tables");
  return res.json();
}

export async function apiToggleTable(tableId: string) {
  await fetch("/api/tables", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "toggle", tableId }),
  });
}

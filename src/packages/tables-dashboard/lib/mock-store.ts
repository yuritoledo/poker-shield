import { mockTables as initialTables } from "./mock-data";
import type { TableRow } from "./types";

let tables = [...initialTables];
const listeners = new Set<() => void>();

export function resetStore(): void {
  tables = [...initialTables];
  listeners.clear();
}

export function getTables(): TableRow[] {
  return tables;
}

export function toggleTable(id: string): void {
  tables = tables.map((t) =>
    t.id === id
      ? { ...t, status: t.status === "active" ? "inactive" : "active" }
      : t,
  );
  listeners.forEach((l) => l());
}

export function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

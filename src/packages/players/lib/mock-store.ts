import { mockPlayers as initialPlayers } from "./mock-data";
import type { PlayerRow } from "./types";

let players = [...initialPlayers];
const listeners = new Set<() => void>();

export function resetStore(): void {
  players = [...initialPlayers];
  listeners.clear();
}

export function getPlayers(): PlayerRow[] {
  return players;
}

export function flagPlayer(id: string): void {
  players = players.map((p) =>
    p.id === id ? { ...p, isFlagged: !p.isFlagged } : p,
  );
  listeners.forEach((l) => l());
}

export function adjustScore(id: string, delta: number): void {
  players = players.map((p) =>
    p.id === id
      ? {
          ...p,
          suspiciousScore: Math.max(0, Math.min(100, p.suspiciousScore + delta)),
        }
      : p,
  );
  listeners.forEach((l) => l());
}

export function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

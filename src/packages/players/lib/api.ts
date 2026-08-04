import type { PlayerRow } from "./types";

export async function fetchPlayers(): Promise<PlayerRow[]> {
  const res = await fetch("/api/players");
  if (!res.ok) throw new Error("Failed to fetch players");
  return res.json();
}

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

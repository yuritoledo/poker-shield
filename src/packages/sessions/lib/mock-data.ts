// Mock data for Session History.
// ponytail: static data — replace with real API when backend exists.

import type { Session, SessionStats } from "./types";

export function getSessionStats(): SessionStats {
  return {
    totalSessions: 186,
    totalHands: 42800,
    totalRevenue: 284520,
    avgDuration: "2h 14m",
  };
}

const GAME_TYPES = ["Texas Hold'em", "Omaha", "Seven-Card Stud", "Razz"];
const STAKES = ["$1/$2", "$2/$5", "$5/$10", "$10/$25"];

export function getSessions(): Session[] {
  const sessions: Session[] = [];
  for (let i = 0; i < 25; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    d.setHours(18 + (i % 4), (i * 13) % 60);
    const hands = 80 + Math.floor(Math.random() * 200);
    const revenue = 200 + Math.floor(Math.random() * 1500);
    const durationH = 1 + Math.floor(Math.random() * 4);
    const durationM = Math.floor(Math.random() * 60);
    sessions.push({
      id: `SES-${String(1000 + i).slice(1)}`,
      tableName: `Table ${(i % 6) + 1}`,
      gameType: GAME_TYPES[i % GAME_TYPES.length],
      stakes: STAKES[i % STAKES.length],
      startedAt: d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }) + `, ${d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`,
      duration: `${durationH}h ${String(durationM).padStart(2, "0")}m`,
      handsPlayed: hands,
      totalRevenue: revenue,
      playerCount: 4 + Math.floor(Math.random() * 6),
      status: i < 20 ? "completed" : "active",
    });
  }
  return sessions;
}

export const AVAILABLE_GAME_TYPES = GAME_TYPES;

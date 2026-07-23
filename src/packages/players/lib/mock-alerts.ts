import type { PlayerAlert } from "./types";

/** Mock alerts keyed by player ID. Shown in expanded row (max 3 per player). */
export const mockAlerts: Record<string, PlayerAlert[]> = {
  p1: [
    {
      id: "a1",
      type: "bot-detected",
      severity: "high",
      description: "Unusual betting pattern — consistent 2.5s response time across 47 hands",
      createdAt: "2026-07-22T14:25:00Z",
    },
    {
      id: "a2",
      type: "multi-accounting",
      severity: "critical",
      description: "Alias linked to 3 other accounts on same table via IP correlation",
      createdAt: "2026-07-21T09:12:00Z",
    },
    {
      id: "a3",
      type: "pattern-deviance",
      severity: "medium",
      description: "Win rate deviation >3σ from table average over 200 hands",
      createdAt: "2026-07-19T16:40:00Z",
    },
  ],
  p5: [
    {
      id: "a4",
      type: "collusion",
      severity: "critical",
      description: "Pre-flop raising pattern matches known collusion signature with player p6",
      createdAt: "2026-07-23T06:15:00Z",
    },
    {
      id: "a5",
      type: "pattern-deviance",
      severity: "high",
      description: "Folds 92% of hands when not holding premium — statistical anomaly",
      createdAt: "2026-07-22T22:30:00Z",
    },
  ],
  p7: [
    {
      id: "a6",
      type: "manual",
      severity: "low",
      description: "Reported by operator for excessive chat spam",
      createdAt: "2026-07-20T11:00:00Z",
    },
  ],
  p9: [
    {
      id: "a7",
      type: "bot-detected",
      severity: "high",
      description: "Identical min-raise timing (within 100ms) over 150 hands",
      createdAt: "2026-07-23T03:45:00Z",
    },
    {
      id: "a8",
      type: "multi-accounting",
      severity: "medium",
      description: "Account created 5 minutes after previous account was flagged",
      createdAt: "2026-07-22T19:20:00Z",
    },
    {
      id: "a9",
      type: "collusion",
      severity: "critical",
      description: "Simultaneous check-raise with player p10 across 12 consecutive hands",
      createdAt: "2026-07-22T14:10:00Z",
    },
  ],
};

import type { PlayerSession, ScoreChange } from "./types";

/**
 * Mock session history per player.
 * Faked — each player has played at 2-4 tables over time.
 */
export const mockSessions: Record<string, PlayerSession[]> = {
  p1: [
    { tableId: "1", tableName: "High Stakes", gameType: "Texas Hold'em", handsPlayed: 187, buyIn: 1000, netResult: 420, startedAt: "2026-07-21T19:00:00Z", endedAt: "2026-07-21T23:30:00Z" },
    { tableId: "1", tableName: "High Stakes", gameType: "Texas Hold'em", handsPlayed: 155, buyIn: 1000, netResult: -180, startedAt: "2026-07-22T14:00:00Z", endedAt: "2026-07-22T18:45:00Z" },
    { tableId: "3", tableName: "Omaha Beach", gameType: "Omaha", handsPlayed: 89, buyIn: 500, netResult: 310, startedAt: "2026-07-19T20:00:00Z", endedAt: "2026-07-19T22:15:00Z" },
  ],
  p2: [
    { tableId: "1", tableName: "High Stakes", gameType: "Texas Hold'em", handsPlayed: 98, buyIn: 1000, netResult: -50, startedAt: "2026-07-22T13:00:00Z", endedAt: "2026-07-22T15:30:00Z" },
    { tableId: "2", tableName: "Night Owls", gameType: "Texas Hold'em", handsPlayed: 91, buyIn: 200, netResult: 120, startedAt: "2026-07-21T22:00:00Z", endedAt: "2026-07-22T01:00:00Z" },
  ],
  p3: [
    { tableId: "2", tableName: "Night Owls", gameType: "Texas Hold'em", handsPlayed: 210, buyIn: 200, netResult: 340, startedAt: "2026-07-22T04:00:00Z", endedAt: "2026-07-22T09:30:00Z" },
    { tableId: "2", tableName: "Night Owls", gameType: "Texas Hold'em", handsPlayed: 246, buyIn: 200, netResult: 185, startedAt: "2026-07-23T00:30:00Z", endedAt: "2026-07-23T05:45:00Z" },
    { tableId: "5", tableName: "The River", gameType: "Texas Hold'em", handsPlayed: 67, buyIn: 500, netResult: -200, startedAt: "2026-07-20T18:00:00Z", endedAt: "2026-07-20T20:15:00Z" },
  ],
  p4: [
    { tableId: "2", tableName: "Night Owls", gameType: "Texas Hold'em", handsPlayed: 134, buyIn: 200, netResult: 90, startedAt: "2026-07-22T23:00:00Z", endedAt: "2026-07-23T02:30:00Z" },
    { tableId: "2", tableName: "Night Owls", gameType: "Texas Hold'em", handsPlayed: 144, buyIn: 200, netResult: -60, startedAt: "2026-07-23T03:00:00Z", endedAt: "2026-07-23T04:30:00Z" },
  ],
  p5: [
    { tableId: "3", tableName: "Omaha Beach", gameType: "Omaha", handsPlayed: 312, buyIn: 500, netResult: 890, startedAt: "2026-07-22T11:00:00Z", endedAt: "2026-07-22T19:00:00Z" },
    { tableId: "3", tableName: "Omaha Beach", gameType: "Omaha", handsPlayed: 200, buyIn: 500, netResult: 450, startedAt: "2026-07-23T00:00:00Z", endedAt: "2026-07-23T06:15:00Z" },
  ],
  p6: [
    { tableId: "3", tableName: "Omaha Beach", gameType: "Omaha", handsPlayed: 67, buyIn: 500, netResult: -120, startedAt: "2026-07-22T20:00:00Z", endedAt: "2026-07-22T21:45:00Z" },
  ],
  p7: [
    { tableId: "5", tableName: "The River", gameType: "Texas Hold'em", handsPlayed: 23, buyIn: 500, netResult: -30, startedAt: "2026-07-20T11:00:00Z", endedAt: "2026-07-20T12:15:00Z" },
  ],
  p8: [
    { tableId: "5", tableName: "The River", gameType: "Texas Hold'em", handsPlayed: 445, buyIn: 500, netResult: 780, startedAt: "2026-07-21T14:00:00Z", endedAt: "2026-07-22T02:00:00Z" },
    { tableId: "5", tableName: "The River", gameType: "Texas Hold'em", handsPlayed: 446, buyIn: 500, netResult: 320, startedAt: "2026-07-22T14:30:00Z", endedAt: "2026-07-23T06:30:00Z" },
  ],
  p9: [
    { tableId: "6", tableName: "Lowball", gameType: "Razz", handsPlayed: 78, buyIn: 100, netResult: 210, startedAt: "2026-07-22T22:00:00Z", endedAt: "2026-07-23T00:30:00Z" },
    { tableId: "6", tableName: "Lowball", gameType: "Razz", handsPlayed: 78, buyIn: 100, netResult: -40, startedAt: "2026-07-23T01:00:00Z", endedAt: "2026-07-23T03:45:00Z" },
  ],
  p10: [
    { tableId: "6", tableName: "Lowball", gameType: "Razz", handsPlayed: 103, buyIn: 100, netResult: 55, startedAt: "2026-07-22T23:00:00Z", endedAt: "2026-07-23T01:10:00Z" },
    { tableId: "6", tableName: "Lowball", gameType: "Razz", handsPlayed: 100, buyIn: 100, netResult: -15, startedAt: "2026-07-23T01:30:00Z", endedAt: "2026-07-23T03:10:00Z" },
  ],
  p11: [
    { tableId: "2", tableName: "Night Owls", gameType: "Texas Hold'em", handsPlayed: 400, buyIn: 200, netResult: 110, startedAt: "2026-07-20T19:00:00Z", endedAt: "2026-07-21T02:00:00Z" },
    { tableId: "2", tableName: "Night Owls", gameType: "Texas Hold'em", handsPlayed: 334, buyIn: 200, netResult: 50, startedAt: "2026-07-21T18:00:00Z", endedAt: "2026-07-21T23:30:00Z" },
  ],
  p12: [
    { tableId: "5", tableName: "The River", gameType: "Texas Hold'em", handsPlayed: 12, buyIn: 500, netResult: -480, startedAt: "2026-07-19T09:30:00Z", endedAt: "2026-07-19T10:15:00Z" },
  ],
};

/**
 * Mock score change timeline per player.
 */
export const mockScoreChanges: Record<string, ScoreChange[]> = {
  p1: [
    { timestamp: "2026-07-19T16:40:00Z", previousScore: 80, newScore: 85, reason: "Alert triggered — pattern deviance" },
    { timestamp: "2026-07-21T09:12:00Z", previousScore: 85, newScore: 85, reason: "Multi-accounting alert" },
  ],
  p5: [
    { timestamp: "2026-07-22T22:30:00Z", previousScore: 88, newScore: 92, reason: "Pattern deviance alert" },
    { timestamp: "2026-07-23T06:15:00Z", previousScore: 92, newScore: 92, reason: "Collusion alert" },
  ],
  p9: [
    { timestamp: "2026-07-22T14:10:00Z", previousScore: 72, newScore: 78, reason: "Collusion alert" },
    { timestamp: "2026-07-22T19:20:00Z", previousScore: 78, newScore: 78, reason: "Multi-accounting alert" },
    { timestamp: "2026-07-23T03:45:00Z", previousScore: 78, newScore: 78, reason: "Bot-detected alert" },
  ],
  p7: [
    { timestamp: "2026-07-20T11:00:00Z", previousScore: 0, newScore: 8, reason: "Manual report by operator" },
  ],
};

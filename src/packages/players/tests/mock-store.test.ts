/// <reference types="vitest" />
import { describe, it, expect, beforeEach } from "vitest";
import {
  getPlayers,
  flagPlayer,
  adjustScore,
  subscribe,
  resetStore,
} from "../index";

describe("mock-store", () => {
  beforeEach(() => {
    resetStore();
  });

  it("getPlayers returns an array", () => {
    const players = getPlayers();
    expect(Array.isArray(players)).toBe(true);
  });

  it("flagPlayer toggles isFlagged from false to true", () => {
    const player = getPlayers().find((p) => !p.isFlagged)!;
    flagPlayer(player.id);
    const updated = getPlayers().find((p) => p.id === player.id)!;
    expect(updated.isFlagged).toBe(true);
  });

  it("flagPlayer toggles isFlagged from true to false", () => {
    const player = getPlayers().find((p) => p.isFlagged)!;
    flagPlayer(player.id);
    const updated = getPlayers().find((p) => p.id === player.id)!;
    expect(updated.isFlagged).toBe(false);
  });

  it("adjustScore adds delta to suspiciousScore", () => {
    const player = getPlayers().find((p) => p.suspiciousScore < 95)!;
    const before = player.suspiciousScore;
    adjustScore(player.id, 5);
    const updated = getPlayers().find((p) => p.id === player.id)!;
    expect(updated.suspiciousScore).toBe(before + 5);
  });

  it("adjustScore subtracts delta from suspiciousScore", () => {
    const player = getPlayers().find((p) => p.suspiciousScore > 5)!;
    const before = player.suspiciousScore;
    adjustScore(player.id, -5);
    const updated = getPlayers().find((p) => p.id === player.id)!;
    expect(updated.suspiciousScore).toBe(before - 5);
  });

  it("adjustScore clamps to min 0", () => {
    const player = getPlayers().find((p) => p.suspiciousScore < 5)!;
    adjustScore(player.id, -100);
    const updated = getPlayers().find((p) => p.id === player.id)!;
    expect(updated.suspiciousScore).toBe(0);
  });

  it("adjustScore clamps to max 100", () => {
    const player = getPlayers().find((p) => p.suspiciousScore > 0)!;
    adjustScore(player.id, 200);
    const updated = getPlayers().find((p) => p.id === player.id)!;
    expect(updated.suspiciousScore).toBe(100);
  });

  it("notifies subscribers on flagPlayer", () => {
    let called = 0;
    const unsub = subscribe(() => {
      called++;
    });
    const player = getPlayers().find((p) => p.isFlagged)!;
    flagPlayer(player.id);
    expect(called).toBe(1);
    unsub();
  });

  it("notifies subscribers on adjustScore", () => {
    let called = 0;
    const unsub = subscribe(() => {
      called++;
    });
    const player = getPlayers()[0];
    adjustScore(player.id, 5);
    expect(called).toBe(1);
    unsub();
  });

  it("unsubscribe stops notifications", () => {
    let called = 0;
    const unsub = subscribe(() => {
      called++;
    });
    unsub();
    const player = getPlayers().find((p) => p.isFlagged)!;
    flagPlayer(player.id);
    expect(called).toBe(0);
  });
});

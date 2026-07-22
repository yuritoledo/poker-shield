/// <reference types="vitest" />
import { describe, it, expect } from "vitest";
import { mockTables } from "../index";

describe("TablesDashboard types", () => {
  it("mockTables is an array", () => {
    expect(Array.isArray(mockTables)).toBe(true);
  });

  it("mockTables has at least one entry", () => {
    expect(mockTables.length).toBeGreaterThan(0);
  });

  it("each mock table has the correct shape", () => {
    for (const table of mockTables) {
      expect(table).toMatchObject({
        id: expect.any(String),
        name: expect.any(String),
        gameType: expect.any(String),
        stakes: expect.any(String),
        status: expect.stringMatching(/^(active|inactive)$/),
        handsPlayed: expect.any(Number),
        playerCount: expect.any(Number),
        flaggedPlayerCount: expect.any(Number),
      });
    }
  });

  it("includes tables across different game types", () => {
    const gameTypes = new Set(mockTables.map((t) => t.gameType));
    expect(gameTypes.size).toBeGreaterThanOrEqual(2);
  });

  it("includes both active and inactive tables", () => {
    const hasActive = mockTables.some((t) => t.status === "active");
    const hasInactive = mockTables.some((t) => t.status === "inactive");
    expect(hasActive).toBe(true);
    expect(hasInactive).toBe(true);
  });
});

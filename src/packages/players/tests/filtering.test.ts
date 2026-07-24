/// <reference types="vitest" />
import { describe, it, expect } from "vitest";
import { filterPlayers, mockPlayers } from "../index";
import type { PlayerFilters } from "../index";

const noFilter: PlayerFilters = {
  scoreMin: null,
  scoreMax: null,
  dateFrom: null,
  dateTo: null,
};

describe("filterPlayers", () => {
  it("returns all players when all filters are null", () => {
    expect(filterPlayers(mockPlayers, noFilter)).toHaveLength(
      mockPlayers.length,
    );
  });

  it("filters by minimum score", () => {
    const result = filterPlayers(mockPlayers, { ...noFilter, scoreMin: 80 });
    expect(result.every((p) => p.suspiciousScore >= 80)).toBe(true);
  });

  it("filters by maximum score", () => {
    const result = filterPlayers(mockPlayers, { ...noFilter, scoreMax: 10 });
    expect(result.every((p) => p.suspiciousScore <= 10)).toBe(true);
  });

  it("filters by score range", () => {
    const result = filterPlayers(mockPlayers, {
      ...noFilter,
      scoreMin: 40,
      scoreMax: 60,
    });
    expect(
      result.every((p) => p.suspiciousScore >= 40 && p.suspiciousScore <= 60),
    ).toBe(true);
  });

  it("filters by date from", () => {
    const result = filterPlayers(mockPlayers, {
      ...noFilter,
      dateFrom: "2026-07-23T00:00:00Z",
    });
    expect(result.every((p) => p.lastActive >= "2026-07-23T00:00:00Z")).toBe(
      true,
    );
  });

  it("filters by date to", () => {
    const result = filterPlayers(mockPlayers, {
      ...noFilter,
      dateTo: "2026-07-20T23:59:59Z",
    });
    expect(result.every((p) => p.lastActive <= "2026-07-20T23:59:59Z")).toBe(
      true,
    );
  });

  it("AND-combines score and date filters", () => {
    const result = filterPlayers(mockPlayers, {
      scoreMin: 70,
      scoreMax: null,
      dateFrom: "2026-07-22T00:00:00Z",
      dateTo: null,
    });
    // RiverKing (85, Jul 22) and OmahaShark (92, Jul 23) and QuickClick (78, Jul 23)
    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result.every((p) => p.suspiciousScore >= 70)).toBe(true);
  });

  it("returns empty array when no players match", () => {
    const result = filterPlayers(mockPlayers, {
      ...noFilter,
      scoreMin: 200,
    });
    expect(result).toHaveLength(0);
  });
});

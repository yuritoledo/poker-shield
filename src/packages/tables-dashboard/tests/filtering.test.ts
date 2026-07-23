/// <reference types="vitest" />
import { describe, it, expect } from "vitest";
import { applyFilters } from "../lib/filtering";
import { mockTables } from "../lib/mock-data";

const allFilter = { gameType: "all" as const, stakes: "all" as const, status: "all" as const };

describe("applyFilters", () => {
  it("returns all tables when all filters are 'all'", () => {
    expect(applyFilters(mockTables, allFilter)).toHaveLength(mockTables.length);
  });

  it("filters by game type", () => {
    const result = applyFilters(mockTables, { ...allFilter, gameType: "omaha" });
    expect(result.every((t) => t.gameType === "omaha")).toBe(true);
  });

  it("filters by status", () => {
    const result = applyFilters(mockTables, { ...allFilter, status: "inactive" });
    expect(result.every((t) => t.status === "inactive")).toBe(true);
  });

  it("filters by stakes", () => {
    const result = applyFilters(mockTables, { ...allFilter, stakes: "2/5" });
    expect(result.every((t) => t.stakes === "2/5")).toBe(true);
  });

  it("AND-combines multiple filters", () => {
    const result = applyFilters(mockTables, { gameType: "texas-holdem", stakes: "2/5", status: "active" });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Night Owls");
  });

  it("returns empty array when no tables match", () => {
    const result = applyFilters(mockTables, { ...allFilter, stakes: "100/200" });
    expect(result).toHaveLength(0);
  });
});

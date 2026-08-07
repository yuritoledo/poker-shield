import { describe, it, expect, afterEach, vi } from "vitest";
import { fetchTables, apiToggleTable } from "../lib/api";
import { mockTables } from "../lib/mock-data";

describe("fetchTables", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("GETs the tables API and returns parsed table rows", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(mockTables), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    const tables = await fetchTables();

    expect(fetchMock).toHaveBeenCalledWith("/api/tables");
    expect(tables).toEqual(mockTables);
  });

  it("throws when the request fails", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("server error", { status: 500 }),
    );

    await expect(fetchTables()).rejects.toThrow("Failed to fetch tables");
  });
});

describe("apiToggleTable", () => {
  it("PATCHes the toggle action for the given table", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, { status: 200 }),
    );

    await apiToggleTable("table-1");

    expect(fetchMock).toHaveBeenCalledWith("/api/tables", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "toggle", tableId: "table-1" }),
    });
  });
});

import { describe, it, expect, afterEach, vi } from "vitest";
import { fetchPlayers, apiFlagPlayer, apiAdjustScore } from "../lib/api";
import { mockPlayers } from "../lib/mock-data";

describe("fetchPlayers", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("GETs the players API and returns parsed player rows", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(mockPlayers), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    const players = await fetchPlayers();

    expect(fetchMock).toHaveBeenCalledWith("/api/players");
    expect(players).toEqual(mockPlayers);
  });

  it("throws when the request fails", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("server error", { status: 500 }),
    );

    await expect(fetchPlayers()).rejects.toThrow("Failed to fetch players");
  });
});

describe("apiFlagPlayer", () => {
  it("PATCHes the flag action for the given player", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, { status: 200 }),
    );

    await apiFlagPlayer("player-1");

    expect(fetchMock).toHaveBeenCalledWith("/api/players", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "flag", playerId: "player-1" }),
    });
  });
});

describe("apiAdjustScore", () => {
  it("PATCHes the adjust-score action with the given delta", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, { status: 200 }),
    );

    await apiAdjustScore("player-1", 5);

    expect(fetchMock).toHaveBeenCalledWith("/api/players", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "adjust-score", playerId: "player-1", delta: 5 }),
    });
  });
});

/// <reference types="vitest" />
import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { usePlayersQuery, PLAYERS_QUERY_KEY } from "../lib/use-players-query";
import { mockPlayers } from "../lib/mock-data";

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

describe("usePlayersQuery", () => {
  beforeEach(() => {
    // Mock fetch to return mock player data (simulates API route)
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(mockPlayers), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
  });

  it("returns player data from the API", async () => {
    const { result } = renderHook(() => usePlayersQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeDefined();
    expect(result.current.data!.length).toBeGreaterThan(0);
    expect(result.current.data![0]).toHaveProperty("alias");
  });

  it("uses the correct query key", () => {
    expect(PLAYERS_QUERY_KEY).toEqual(["players"]);
  });
});

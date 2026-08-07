
import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useFlagPlayerMutation } from "../lib/use-flag-player-mutation";
import { PLAYERS_QUERY_KEY } from "../lib/use-players-query";

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

describe("useFlagPlayerMutation", () => {
  beforeEach(() => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, { status: 200 }),
    );
  });

  it("calls the flag API and invalidates the players query on success", async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useFlagPlayerMutation(), { wrapper });

    result.current.mutate("player-1");

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(globalThis.fetch).toHaveBeenCalledWith("/api/players", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "flag", playerId: "player-1" }),
    });
    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: PLAYERS_QUERY_KEY,
    });
  });

  it("exposes error state when the request fails", async () => {
    vi.restoreAllMocks();
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useFlagPlayerMutation(), {
      wrapper: createWrapper(),
    });

    result.current.mutate("player-1");

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeDefined();
  });

  it("exposes pending state during the mutation", async () => {
    vi.restoreAllMocks();
     
    vi.spyOn(globalThis, "fetch").mockImplementation(
      async () => new Promise<Response>(() => {}),
    );

    const { result } = renderHook(() => useFlagPlayerMutation(), {
      wrapper: createWrapper(),
    });

    result.current.mutate("player-1");

    await waitFor(() => expect(result.current.isPending).toBe(true));
  });
});

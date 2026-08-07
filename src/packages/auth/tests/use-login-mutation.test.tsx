
import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useLoginMutation } from "../lib/use-login-mutation";
import { useAuthStore } from "../lib/auth-store";

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

describe("useLoginMutation", () => {
  beforeEach(() => {
    useAuthStore.getState().logout();
  });

  it("sets the session in the auth store on success", async () => {
    const { result } = renderHook(() => useLoginMutation(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ email: "test@example.com", password: "secret" });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const session = useAuthStore.getState().session;
    expect(session).toBeDefined();
    expect(session!.user.email).toBe("test@example.com");
    expect(session!.user.name).toBe("test");
    expect(session!.user.role).toBe("operator");
  });

});

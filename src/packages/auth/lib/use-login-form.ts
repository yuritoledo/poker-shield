// Controller hook — bridges the presentational LoginForm with the Zustand store.
// Thin layer: one concern only (store glue logic). No premature optimization.

"use client";

import { useAuthStore } from "./auth-store";

interface LoginControllerProps {
  onLogin: (email: string, password: string) => Promise<void>;
}

export function useLoginController({ onLogin }: LoginControllerProps) {
  const { isLoading, error, setLoading, setError, clearError } = useAuthStore();

  async function handleLogin(email: string, password: string) {
    clearError();
    setLoading(true);

    try {
      await onLogin(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return { handleLogin, isLoading, error };
}

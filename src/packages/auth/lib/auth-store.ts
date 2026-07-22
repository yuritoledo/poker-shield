// Global auth state using Zustand.
// Private — implementation detail of the auth package.

import { create } from "zustand";
import type { Session } from "./types";

interface AuthState {
  session: Session | null;
  isLoading: boolean;
  error: string | null;

  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  isLoading: false,
  error: null,

  setSession: (session) => set({ session, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  logout: () => set({ session: null, error: null }),
}));

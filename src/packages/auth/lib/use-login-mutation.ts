import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "./auth-store";
import type { Session } from "./types";

function createSession(email: string): Session {
  return {
    user: {
      id: crypto.randomUUID(),
      email,
      name: email.split("@")[0],
      role: "operator",
      tenantId: "default",
    },
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  };
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      // Simulate a server call — password is accepted as-is in the placeholder auth
      // ponytail: no real auth backend yet, add when integrating with Auth.js or similar
      return createSession(credentials.email);
    },
    onSuccess(session) {
      useAuthStore.getState().setSession(session);
      document.cookie = "session=true;path=/;max-age=86400;samesite=lax";
    },
  });
}

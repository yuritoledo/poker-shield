// Access control logic — private, lives in lib/.
// Only the entry point exports this.

import type { Role, Session } from "./types";

interface AccessResult {
  allowed: boolean;
  reason?: "unauthenticated" | "insufficient-role";
}

export function requireAccess(
  session: Session | undefined,
  allowedRoles: Role[],
): AccessResult {
  if (!session) {
    return { allowed: false, reason: "unauthenticated" };
  }

  if (!allowedRoles.includes(session.user.role)) {
    return { allowed: false, reason: "insufficient-role" };
  }

  return { allowed: true };
}

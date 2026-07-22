// Entry point for the auth package.
// Public API — outside code imports from here, never from lib/.

export { requireAccess } from "./lib/access-control";
export { LoginForm } from "./lib/login-form";
export { useAuthStore } from "./lib/auth-store";
export type { Role, Session } from "./lib/types";

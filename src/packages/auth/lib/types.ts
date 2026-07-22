// Auth types — private implementation detail.
// Exported through the package entry point.

export type Role = "admin" | "operator" | "viewer";

export interface Session {
  user: {
    id: string;
    email: string;
    name: string;
    role: Role;
    tenantId: string;
  };
  expiresAt: Date;
}

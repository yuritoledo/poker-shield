// View-model types for the Alerts package.
// Decoupled from the Drizzle ORM schema — the UI never imports from the ORM.

export type AlertType =
  | "bot-detected"
  | "multi-accounting"
  | "collusion"
  | "pattern-deviance"
  | "manual";

export type AlertSeverity = "low" | "medium" | "high" | "critical";

/** An alert attached to a player (shown in expanded row). */
export interface PlayerAlert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  description: string;
  createdAt: string; // ISO date
}

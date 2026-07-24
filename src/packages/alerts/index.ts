// Entry point for the alerts package.
// Public API — outside code imports from here, never from lib/.

export type { PlayerAlert, AlertType, AlertSeverity } from "./lib/types";
export { AlertBadge } from "./lib/alert-badge";
export { AlertList } from "./lib/alert-list";
export { useAlerts } from "./lib/use-alerts";
export {
  getAlerts,
  getAlertsMap,
  subscribe,
  resetStore,
} from "./lib/mock-store";

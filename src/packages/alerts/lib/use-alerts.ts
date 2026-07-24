"use client";

import { useSyncExternalStore } from "react";
import { getAlertsMap, subscribe } from "./mock-store";
import type { PlayerAlert } from "./types";

/**
 * Subscribe to the reactive alert store.
 *
 * Returns a map of playerId → PlayerAlert[] that updates in realtime
 * as new alerts are generated and old ones resolve.
 */
export function useAlerts(): Record<string, PlayerAlert[]> {
  return useSyncExternalStore(subscribe, getAlertsMap, getAlertsMap);
}

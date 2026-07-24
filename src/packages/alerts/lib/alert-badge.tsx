"use client";

import type { PlayerAlert, AlertSeverity } from "./types";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

export interface AlertBadgeProps {
  alerts: PlayerAlert[];
}

const MAX_SEVERITY_LABEL: Record<AlertSeverity, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

/**
 * Severity-colored badge showing the number of active alerts
 * and the highest severity level.
 */
export function AlertBadge({ alerts }: AlertBadgeProps) {
  if (alerts.length === 0) return null;

  const maxSeverity = getMaxSeverity(alerts);
  const variant = severityVariant(maxSeverity);

  return (
    <Badge variant={variant} className="inline-flex items-center gap-1 text-xs">
      <AlertTriangle className="h-3 w-3" />
      {alerts.length}
    </Badge>
  );
}

function getMaxSeverity(alerts: PlayerAlert[]): AlertSeverity {
  const rank: Record<AlertSeverity, number> = {
    low: 0,
    medium: 1,
    high: 2,
    critical: 3,
  };
  return alerts.reduce((max, a) =>
    rank[a.severity] > rank[max] ? a.severity : max,
  alerts[0].severity);
}

function severityVariant(severity: AlertSeverity): "destructive" | "secondary" | "outline" {
  if (severity === "critical" || severity === "high") return "destructive";
  if (severity === "medium") return "secondary";
  return "outline";
}

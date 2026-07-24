"use client";

import type { PlayerAlert, AlertSeverity } from "./types";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

export interface AlertListProps {
  alerts: PlayerAlert[];
  /** Max alerts to show (default no limit). */
  max?: number;
}

const ALERT_TYPE_LABEL: Record<string, string> = {
  "bot-detected": "Bot Detected",
  "multi-accounting": "Multi-Accounting",
  collusion: "Collusion",
  "pattern-deviance": "Pattern Deviance",
  manual: "Manual Report",
};

/**
 * List of alert cards for a player's expanded row.
 */
export function AlertList({ alerts, max }: AlertListProps) {
  if (alerts.length === 0) return null;

  const displayed = max ? alerts.slice(0, max) : alerts;

  return (
    <div className="space-y-2">
      {displayed.map((alert) => (
        <AlertCard key={alert.id} alert={alert} />
      ))}
    </div>
  );
}

function AlertCard({ alert }: { alert: PlayerAlert }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border bg-background p-3">
      <AlertTriangle
        className={`mt-0.5 h-4 w-4 shrink-0 ${
          alert.severity === "critical" || alert.severity === "high"
            ? "text-destructive"
            : "text-muted-foreground"
        }`}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium">
            {ALERT_TYPE_LABEL[alert.type] ?? alert.type}
          </span>
          <SeverityBadge severity={alert.severity} />
        </div>
        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
          {alert.description}
        </p>
        <p className="mt-1 text-[10px] text-muted-foreground/60">
          {formatDate(alert.createdAt)}
        </p>
      </div>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: AlertSeverity }) {
  const variant =
    severity === "critical" || severity === "high"
      ? "destructive"
      : severity === "medium"
        ? "secondary"
        : "outline";

  return (
    <Badge variant={variant} className="px-1.5 py-0 text-[10px]">
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </Badge>
  );
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

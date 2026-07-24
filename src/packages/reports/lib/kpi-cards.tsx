// KPI metric cards row — presentational, receives data as props.

import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { KpiMetric } from "./types";

export interface KpiCardsProps {
  metrics: KpiMetric[];
}

export function KpiCards({ metrics }: KpiCardsProps) {
  if (metrics.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {metrics.map((m) => (
        <Card key={m.label}>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">{m.label}</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-mono text-2xl font-semibold tabular-nums text-foreground">
                {m.value}
              </span>
              <span
                className={`inline-flex items-center gap-0.5 font-mono text-xs tabular-nums ${
                  m.change >= 0 ? "text-emerald-500" : "text-rose-500"
                }`}
              >
                {m.change >= 0 ? (
                  <TrendingUp className="size-3" />
                ) : (
                  <TrendingDown className="size-3" />
                )}
                {Math.abs(m.change)}%
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

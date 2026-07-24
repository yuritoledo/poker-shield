// Summary stats bar — presentational, receives data as props.

import { Clock, Hand, DollarSign, List } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { SessionStats } from "./types";

export interface SessionStatsBarProps {
  stats: SessionStats;
}

export function SessionStatsBar({ stats }: SessionStatsBarProps) {
  const items = [
    { icon: List, label: "Total Sessions", value: String(stats.totalSessions) },
    { icon: Hand, label: "Total Hands", value: stats.totalHands.toLocaleString() },
    { icon: DollarSign, label: "Total Revenue", value: `$${stats.totalRevenue.toLocaleString()}` },
    { icon: Clock, label: "Avg. Duration", value: stats.avgDuration },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.label}>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-5" />
              </div>
              <div>
                <p className="font-mono text-lg leading-none font-semibold tabular-nums text-foreground">
                  {item.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{item.label}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

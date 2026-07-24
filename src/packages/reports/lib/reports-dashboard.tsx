// Reports dashboard — layout assembling KPIs + charts.
// Presentational: receives all data as props.

import { KpiCards } from "./kpi-cards";
import { RevenueChart } from "./revenue-chart";
import { TablePerformanceChart } from "./table-performance-chart";
import { GameTypeChart } from "./game-type-chart";
import type { KpiMetric, RevenuePoint, TablePerformance, GameTypeBreakdown } from "./types";

export interface ReportsDashboardProps {
  kpiMetrics: KpiMetric[];
  revenueData: RevenuePoint[];
  tablePerformance: TablePerformance[];
  gameTypeBreakdown: GameTypeBreakdown[];
}

export function ReportsDashboard({
  kpiMetrics,
  revenueData,
  tablePerformance,
  gameTypeBreakdown,
}: ReportsDashboardProps) {
  return (
    <div className="space-y-4">
      <KpiCards metrics={kpiMetrics} />
      <RevenueChart data={revenueData} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TablePerformanceChart data={tablePerformance} />
        <GameTypeChart data={gameTypeBreakdown} />
      </div>
    </div>
  );
}

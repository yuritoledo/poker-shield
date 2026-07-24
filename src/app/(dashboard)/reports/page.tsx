"use client";

import { useMemo } from "react";
import {
  ReportsDashboard,
  getKpiMetrics,
  getRevenueData,
  getTablePerformance,
  getGameTypeBreakdown,
} from "@/packages/reports";

export default function ReportsPage() {
  const kpiMetrics = useMemo(() => getKpiMetrics(), []);
  const revenueData = useMemo(() => getRevenueData(), []);
  const tablePerformance = useMemo(() => getTablePerformance(), []);
  const gameTypeBreakdown = useMemo(() => getGameTypeBreakdown(), []);

  return (
    <ReportsDashboard
      kpiMetrics={kpiMetrics}
      revenueData={revenueData}
      tablePerformance={tablePerformance}
      gameTypeBreakdown={gameTypeBreakdown}
    />
  );
}

// Entry point for the Reports & Analytics package.
// App code imports from here, never from lib/.

export { ReportsDashboard } from "./lib/reports-dashboard";
export type { ReportsDashboardProps } from "./lib/reports-dashboard";
export { KpiCards } from "./lib/kpi-cards";
export type { KpiCardsProps } from "./lib/kpi-cards";
export {
  getKpiMetrics,
  getRevenueData,
  getTablePerformance,
  getGameTypeBreakdown,
} from "./lib/mock-data";
export type {
  KpiMetric,
  RevenuePoint,
  TablePerformance,
  GameTypeBreakdown,
} from "./lib/types";

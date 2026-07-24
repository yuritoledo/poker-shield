// Mock data for the Reports dashboard.
// ponytail: static data — replace with real API when backend exists.

import type {
  KpiMetric,
  RevenuePoint,
  TablePerformance,
  GameTypeBreakdown,
} from "./types";

export function getKpiMetrics(): KpiMetric[] {
  return [
    { label: "Total Revenue", value: "$284,520", change: 12.3 },
    { label: "Active Tables", value: "18", change: 5.1 },
    { label: "Active Players", value: "342", change: -2.4 },
    { label: "Avg. Pot", value: "$84", change: 3.7 },
  ];
}

export function getRevenueData(): RevenuePoint[] {
  const data: RevenuePoint[] = [];
  for (let i = 30; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const revenue = 7000 + Math.sin(i * 0.3) * 2000 + Math.random() * 3000;
    const expenses = 3000 + Math.sin(i * 0.2) * 800 + Math.random() * 1000;
    data.push({
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      revenue: Math.round(revenue),
      expenses: Math.round(expenses),
      profit: Math.round(revenue - expenses),
    });
  }
  return data;
}

export function getTablePerformance(): TablePerformance[] {
  return [
    { tableName: "Table 1 — Texas", handsPlayed: 1240, avgPot: 92, revenue: 28500, occupancy: 87 },
    { tableName: "Table 2 — Omaha", handsPlayed: 980, avgPot: 145, revenue: 32400, occupancy: 72 },
    { tableName: "Table 3 — Stud", handsPlayed: 560, avgPot: 78, revenue: 11200, occupancy: 45 },
    { tableName: "Table 4 — Texas", handsPlayed: 1100, avgPot: 88, revenue: 24100, occupancy: 81 },
    { tableName: "Table 5 — Omaha", handsPlayed: 870, avgPot: 132, revenue: 27800, occupancy: 68 },
    { tableName: "Table 6 — Texas", handsPlayed: 1340, avgPot: 95, revenue: 31600, occupancy: 93 },
  ];
}

export function getGameTypeBreakdown(): GameTypeBreakdown[] {
  return [
    { gameType: "Texas Hold'em", hands: 8450, revenue: 184500 },
    { gameType: "Omaha", hands: 4200, revenue: 98200 },
    { gameType: "Seven-Card Stud", hands: 1800, revenue: 42100 },
    { gameType: "Razz", hands: 620, revenue: 15200 },
  ];
}

// Types for the Reports & Analytics package.

export interface KpiMetric {
  label: string;
  value: string;
  change: number; // percentage vs prior period
}

export interface RevenuePoint {
  date: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface TablePerformance {
  tableName: string;
  handsPlayed: number;
  avgPot: number;
  revenue: number;
  occupancy: number; // percentage
}

export interface GameTypeBreakdown {
  gameType: string;
  hands: number;
  revenue: number;
}

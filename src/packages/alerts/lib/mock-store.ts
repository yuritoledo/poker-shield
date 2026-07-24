import type { PlayerAlert, AlertType, AlertSeverity } from "./types";

// ── Seed data ──────────────────────────────────────────────────────────

const SEED: Record<string, PlayerAlert[]> = {
  p1: [
    {
      id: "a1",
      type: "bot-detected",
      severity: "high",
      description:
        "Unusual betting pattern — consistent 2.5s response time across 47 hands",
      createdAt: "2026-07-22T14:25:00Z",
    },
    {
      id: "a2",
      type: "multi-accounting",
      severity: "critical",
      description:
        "Alias linked to 3 other accounts on same table via IP correlation",
      createdAt: "2026-07-21T09:12:00Z",
    },
    {
      id: "a3",
      type: "pattern-deviance",
      severity: "medium",
      description:
        "Win rate deviation >3σ from table average over 200 hands",
      createdAt: "2026-07-19T16:40:00Z",
    },
  ],
  p5: [
    {
      id: "a4",
      type: "collusion",
      severity: "critical",
      description:
        "Pre-flop raising pattern matches known collusion signature with player p6",
      createdAt: "2026-07-23T06:15:00Z",
    },
    {
      id: "a5",
      type: "pattern-deviance",
      severity: "high",
      description:
        "Folds 92% of hands when not holding premium — statistical anomaly",
      createdAt: "2026-07-22T22:30:00Z",
    },
  ],
  p7: [
    {
      id: "a6",
      type: "manual",
      severity: "low",
      description: "Reported by operator for excessive chat spam",
      createdAt: "2026-07-20T11:00:00Z",
    },
  ],
  p9: [
    {
      id: "a7",
      type: "bot-detected",
      severity: "high",
      description:
        "Identical min-raise timing (within 100ms) over 150 hands",
      createdAt: "2026-07-23T03:45:00Z",
    },
    {
      id: "a8",
      type: "multi-accounting",
      severity: "medium",
      description:
        "Account created 5 minutes after previous account was flagged",
      createdAt: "2026-07-22T19:20:00Z",
    },
    {
      id: "a9",
      type: "collusion",
      severity: "critical",
      description:
        "Simultaneous check-raise with player p10 across 12 consecutive hands",
      createdAt: "2026-07-22T14:10:00Z",
    },
  ],
};

// ── Reactive store ─────────────────────────────────────────────────────

const PLAYER_IDS = [
  "p1", "p2", "p3", "p4", "p5", "p6",
  "p7", "p8", "p9", "p10", "p11", "p12",
];

const TEMPLATES: {
  type: AlertType;
  severity: AlertSeverity;
  desc: string;
}[] = [
  { type: "bot-detected", severity: "high", desc: "Unusual betting pattern — consistent {t}s response time across {n} hands" },
  { type: "multi-accounting", severity: "critical", desc: "Alias linked to {n} other accounts on same table via IP correlation" },
  { type: "collusion", severity: "critical", desc: "Pre-flop raising pattern matches collusion signature with player p{n}" },
  { type: "pattern-deviance", severity: "medium", desc: "Win rate deviation >{n}σ from table average over {n} hands" },
  { type: "manual", severity: "low", desc: "Reported by operator for {reason}" },
  { type: "bot-detected", severity: "high", desc: "Identical min-raise timing (within 100ms) over {n} hands" },
  { type: "multi-accounting", severity: "medium", desc: "Account created {n}min after previous flagged account" },
  { type: "collusion", severity: "critical", desc: "Simultaneous check-raise with player p{n} across {n} consecutive hands" },
  { type: "pattern-deviance", severity: "high", desc: "Folds {n}% of hands when not holding premium — anomaly" },
];

const REASONS = ["excessive chat spam", "table stalling", "multi-tabling abuse", "bot-like behavior", "chip dumping"];

let alertIdCounter = 100;
let alerts: Record<string, PlayerAlert[]> = {};
const listeners = new Set<() => void>();

function deepClone(alerts: Record<string, PlayerAlert[]>): Record<string, PlayerAlert[]> {
  const result: Record<string, PlayerAlert[]> = {};
  for (const key in alerts) {
    result[key] = alerts[key].map((a) => ({ ...a }));
  }
  return result;
}

function notify() {
  // Cache the current state so getAlertsMap returns stable references
  // until the next mutation. React uses Object.is on the snapshot.
  const next = deepClone(alerts);
  alerts = next;
  listeners.forEach((l) => l());
}

export function getAlertsMap(): Record<string, PlayerAlert[]> {
  return alerts;
}

export function getAlerts(playerId: string): PlayerAlert[] {
  return alerts[playerId] ?? [];
}

export function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function resetStore(): void {
  alerts = deepClone(SEED);
  notify();
}

// ── Randomisation ──────────────────────────────────────────────────────

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fillTemplate(t: string): string {
  return t
    .replace(/\{t\}/g, String((Math.random() * 3 + 0.5).toFixed(1)))
    .replace(/\{n\}/g, String(randInt(2, 8)))
    .replace(/\{reason\}/g, pick(REASONS));
}

function generateAlert(): PlayerAlert {
  const tpl = pick(TEMPLATES);
  return {
    id: `gen-${++alertIdCounter}`,
    type: tpl.type,
    severity: tpl.severity,
    description: fillTemplate(tpl.desc),
    createdAt: new Date().toISOString(),
  };
}

// ── Timer ──────────────────────────────────────────────────────────────

let addTimer: ReturnType<typeof setTimeout> | null = null;

function scheduleNext(): void {
  const delay = randInt(8_000, 12_000);
  addTimer = setTimeout(() => {
    addRandomAlert();
    scheduleNext();
  }, delay);
}

function addRandomAlert(): void {
  const playerId = pick(PLAYER_IDS);
  const alert = generateAlert();

  const next = { ...alerts };
  next[playerId] = [...(alerts[playerId] ?? []), alert];
  alerts = next;
  listeners.forEach((l) => l());

  // Auto-resolve after 30-60 seconds
  const lifetime = randInt(30_000, 60_000);
  setTimeout(() => resolveAlert(playerId, alert.id), lifetime);
}

function resolveAlert(playerId: string, alertId: string): void {
  const playerAlerts = alerts[playerId];
  if (!playerAlerts) return;

  const next = { ...alerts };
  next[playerId] = playerAlerts.filter((a) => a.id !== alertId);
  alerts = next;
  listeners.forEach((l) => l());
}

// ── Init ───────────────────────────────────────────────────────────────

resetStore();
if (typeof window !== "undefined") {
  scheduleNext();
}

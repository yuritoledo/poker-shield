"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flag, FlagOff, Minus, Plus } from "lucide-react";
import type { PlayerRow, PlayerSession, ScoreChange, PlayerAlert } from "./types";
import { AlertList } from "@/packages/alerts";
import { useAlerts } from "@/packages/alerts";

export interface PlayerDetailProps {
  player: PlayerRow;
  sessions: PlayerSession[];
  scoreChanges: ScoreChange[];
  onFlagToggle: (playerId: string) => void;
  onScoreAdjust: (playerId: string, delta: number) => void;
}

export function PlayerDetail({
  player,
  sessions,
  scoreChanges,
  onFlagToggle,
  onScoreAdjust,
}: PlayerDetailProps) {
  const allAlerts = useAlerts();
  const alerts: PlayerAlert[] = allAlerts[player.id] ?? [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{player.alias}</h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>
              Score: <span className="font-mono tabular-nums">{player.suspiciousScore}</span>
            </span>
            <span>
              Hands:{" "}
              <span className="font-mono tabular-nums">
                {player.handsPlayed.toLocaleString()}
              </span>
            </span>
            <span>
              Last active:{" "}
              <span className="tabular-nums">
                {formatDate(player.lastActive)}
              </span>
            </span>
          </div>
        </div>
        <Badge variant={player.isFlagged ? "destructive" : "secondary"}>
          {player.isFlagged ? (
            <span className="inline-flex items-center gap-1">
              <Flag className="h-3 w-3" /> Flagged
            </span>
          ) : (
            "Clear"
          )}
        </Badge>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button
          variant={player.isFlagged ? "outline" : "destructive"}
          size="sm"
          onClick={() => onFlagToggle(player.id)}
        >
          {player.isFlagged ? (
            <>
              <FlagOff className="h-3.5 w-3.5" /> Clear Flag
            </>
          ) : (
            <>
              <Flag className="h-3.5 w-3.5" /> Flag as Suspicious
            </>
          )}
        </Button>

        <span className="text-sm text-muted-foreground">Score:</span>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => onScoreAdjust(player.id, -5)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center font-mono tabular-nums text-sm">
            {player.suspiciousScore}
          </span>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => onScoreAdjust(player.id, 5)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Full alert history */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">
          Alerts{" "}
          <span className="text-muted-foreground">({alerts.length})</span>
        </h2>
        {alerts.length > 0 ? (
          <AlertList alerts={alerts} />
        ) : (
          <p className="text-sm text-muted-foreground">No alerts.</p>
        )}
      </section>

      {/* Session history */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">
          Session History{" "}
          <span className="text-muted-foreground">({sessions.length})</span>
        </h2>
        {sessions.length > 0 ? (
          <div className="rounded-lg border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="px-4 py-2 font-medium">Table</th>
                  <th className="px-4 py-2 font-medium">Game</th>
                  <th className="px-4 py-2 text-right font-medium">Hands</th>
                  <th className="px-4 py-2 text-right font-medium">Buy-in</th>
                  <th className="px-4 py-2 text-right font-medium">Net Result</th>
                  <th className="px-4 py-2 font-medium">When</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((s, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="px-4 py-2">{s.tableName}</td>
                    <td className="px-4 py-2 text-muted-foreground">{s.gameType}</td>
                    <td className="px-4 py-2 text-right font-mono tabular-nums">
                      {s.handsPlayed}
                    </td>
                    <td className="px-4 py-2 text-right font-mono tabular-nums">
                      ${s.buyIn}
                    </td>
                    <td
                      className={`px-4 py-2 text-right font-mono tabular-nums ${
                        s.netResult >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {s.netResult >= 0 ? "+" : ""}${s.netResult}
                    </td>
                    <td className="px-4 py-2 text-xs text-muted-foreground tabular-nums">
                      {formatDate(s.startedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No session data.</p>
        )}
      </section>

      {/* Score timeline */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">
          Score Timeline{" "}
          <span className="text-muted-foreground">({scoreChanges.length})</span>
        </h2>
        {scoreChanges.length > 0 ? (
          <div className="space-y-2">
            {scoreChanges.map((sc, i) => {
              const delta = sc.newScore - sc.previousScore;
              return (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border px-4 py-3 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1 font-mono tabular-nums text-xs font-medium ${
                        delta > 0 ? "text-red-500" : delta < 0 ? "text-green-500" : "text-muted-foreground"
                      }`}
                    >
                      {delta > 0 ? "+" : ""}
                      {delta}
                      {delta > 0 ? " ↑" : delta < 0 ? " ↓" : ""}
                    </span>
                    <span>{sc.reason}</span>
                  </div>
                  <span className="tabular-nums text-xs text-muted-foreground">
                    {formatDate(sc.timestamp)}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No score changes recorded.</p>
        )}
      </section>
    </div>
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

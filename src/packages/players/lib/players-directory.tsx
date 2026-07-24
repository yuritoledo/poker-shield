"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronRight,
  Flag,
  FlagOff,
  Minus,
  Plus,
  User,
} from "lucide-react";
import type { PlayerRow } from "./types";
import { useAlerts, AlertBadge, AlertList } from "@/packages/alerts";

export interface PlayersDirectoryProps {
  players: PlayerRow[];
  onFlagToggle: (playerId: string) => void;
  onScoreAdjust: (playerId: string, delta: number) => void;
}

export function PlayersDirectory({
  players,
  onFlagToggle,
  onScoreAdjust,
}: PlayersDirectoryProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const allAlerts = useAlerts();

  function toggleExpand(id: string) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  if (players.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <User className="h-12 w-12 text-muted-foreground/40" />
        <p className="mt-4 text-sm text-muted-foreground">
          No players match your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8" />
            <TableHead>Alias</TableHead>
            <TableHead>Table</TableHead>
            <TableHead className="text-right">Hands</TableHead>
            <TableHead className="text-right">Score</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Active</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player) => {
            const isExpanded = expandedId === player.id;
            const alerts = allAlerts[player.id] ?? [];
            return (
              <TableRow
                key={player.id}
                className="cursor-pointer *:py-2 text-sm"
                onClick={() => toggleExpand(player.id)}
              >
                <TableCell>
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-2">
                    <Link
                      href={`/players/${player.id}`}
                      className="font-medium hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {player.alias}
                    </Link>
                    <AlertBadge alerts={alerts} />
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {player.tableName}
                </TableCell>
                <TableCell className="text-right font-mono tabular-nums">
                  {player.handsPlayed.toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-mono tabular-nums">
                  {player.suspiciousScore}
                </TableCell>
                <TableCell>
                  {player.isFlagged ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Badge
                        variant="destructive"
                        className="inline-flex items-center gap-1"
                      >
                        <Flag className="h-3 w-3" />
                        Flagged
                      </Badge>
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground">Clear</span>
                  )}
                </TableCell>
                <TableCell className="text-xs tabular-nums text-muted-foreground">
                  {formatDate(player.lastActive)}
                </TableCell>

                {/* Expanded row — renders below the data row, full width */}
                {isExpanded && (
                  <TableRow key={`${player.id}-expanded`}>
                    <TableCell colSpan={7} className="bg-muted/30 p-4">
                      <div className="flex flex-col gap-4">
                        {/* Actions row */}
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-muted-foreground">
                            Actions:
                          </span>

                          <Button
                            variant={player.isFlagged ? "outline" : "destructive"}
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onFlagToggle(player.id);
                            }}
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
                              onClick={(e) => {
                                e.stopPropagation();
                                onScoreAdjust(player.id, -5);
                              }}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-mono tabular-nums text-sm">
                              {player.suspiciousScore}
                            </span>
                            <Button
                              variant="outline"
                              size="icon-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                onScoreAdjust(player.id, 5);
                              }}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Alerts section */}
                        {alerts.length > 0 && (
                          <div>
                            <span className="text-sm font-medium text-muted-foreground">
                              Recent Alerts
                            </span>
                            <div className="mt-2">
                              <AlertList alerts={alerts} max={3} />
                            </div>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
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

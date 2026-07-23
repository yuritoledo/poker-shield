"use client";

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
import { AlertTriangle, Table2 } from "lucide-react";
import type { TableRow as TableRowType } from "./types";

const GAME_TYPE_LABELS: Record<string, string> = {
  "texas-holdem": "Texas Hold'em",
  omaha: "Omaha",
  stud: "Stud",
};

export interface TablesDashboardProps {
  tables: TableRowType[];
  onToggle?: (tableId: string) => void;
}

export function TablesDashboard({ tables, onToggle }: TablesDashboardProps) {
  if (tables.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Table2 className="h-12 w-12 text-muted-foreground/40" />
        <p className="mt-4 text-sm text-muted-foreground">
          No tables match your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Game Type</TableHead>
            <TableHead>Stakes</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Hands Played</TableHead>
            <TableHead className="text-right">Players</TableHead>
            <TableHead className="text-right">Flagged</TableHead>
            {onToggle && <TableHead><span className="sr-only">Toggle</span></TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tables.map((table) => (
            <TableRow key={table.id} className="*:py-2 text-sm">
              <TableCell className="font-medium">{table.name}</TableCell>
              <TableCell>
                <Badge variant="outline" className="text-xs font-normal">
                  {GAME_TYPE_LABELS[table.gameType] ?? table.gameType}
                </Badge>
              </TableCell>
              <TableCell className="font-mono tabular-nums">
                {table.stakes}
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      table.status === "active"
                        ? "bg-emerald-500"
                        : "bg-zinc-500"
                    }`}
                  />
                  <span className="text-sm">
                    {table.status === "active" ? "Active" : "Inactive"}
                  </span>
                </span>
              </TableCell>
              <TableCell className="text-right font-mono tabular-nums">
                {table.handsPlayed.toLocaleString()}
              </TableCell>
              <TableCell className="text-right font-mono tabular-nums">
                {table.playerCount}
              </TableCell>
              <TableCell className="text-right">
                {table.flaggedPlayerCount > 0 ? (
                  <Badge
                    variant="destructive"
                    className="inline-flex items-center gap-1 font-mono tabular-nums"
                  >
                    <AlertTriangle className="h-3 w-3" />
                    {table.flaggedPlayerCount}
                  </Badge>
                ) : (
                  <span className="font-mono tabular-nums text-muted-foreground">
                    0
                  </span>
                )}
              </TableCell>
              {onToggle && (
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onToggle(table.id)}
                  >
                    {table.status === "active" ? "Deactivate" : "Activate"}
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

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
import type { TableRow as TableRowType } from "./types";

const GAME_TYPE_LABELS: Record<string, string> = {
  "texas-holdem": "Texas Hold'em",
  omaha: "Omaha",
  stud: "Stud",
};

export interface TablesDashboardProps {
  tables: TableRowType[];
}

export function TablesDashboard({ tables }: TablesDashboardProps) {
  if (tables.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-sm text-muted-foreground">No tables found.</p>
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {tables.map((table) => (
            <TableRow key={table.id}>
              <TableCell className="font-medium">{table.name}</TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {GAME_TYPE_LABELS[table.gameType] ?? table.gameType}
                </Badge>
              </TableCell>
              <TableCell>{table.stakes}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    table.status === "active" ? "default" : "outline"
                  }
                >
                  {table.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {table.handsPlayed.toLocaleString()}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {table.playerCount}
              </TableCell>
              <TableCell className="text-right">
                {table.flaggedPlayerCount > 0 ? (
                  <Badge variant="destructive" className="tabular-nums">
                    {table.flaggedPlayerCount}
                  </Badge>
                ) : (
                  <span className="tabular-nums text-muted-foreground">
                    {table.flaggedPlayerCount}
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

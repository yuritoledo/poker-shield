"use client";

import { Users } from "lucide-react";

export default function PlayersPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <Users className="h-16 w-16 text-muted-foreground/30" />
      <h2 className="mt-6 text-lg font-semibold text-muted-foreground">
        Players
      </h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground/60">
        Track known and flagged players across all monitored tables.
      </p>
      <span className="mt-6 inline-flex items-center rounded-full border border-zinc-700 px-3 py-1 text-xs font-medium text-muted-foreground">
        Coming soon
      </span>
    </div>
  );
}

"use client";

import { BellRing } from "lucide-react";

export default function AlertsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <BellRing className="h-16 w-16 text-muted-foreground/30" />
      <h2 className="mt-6 text-lg font-semibold text-muted-foreground">
        Alerts
      </h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground/60">
        Monitor suspicious activity flagged by Poker Shield&apos;s detection
        engine.
      </p>
      <span className="mt-6 inline-flex items-center rounded-full border border-zinc-700 px-3 py-1 text-xs font-medium text-muted-foreground">
        Coming soon
      </span>
    </div>
  );
}

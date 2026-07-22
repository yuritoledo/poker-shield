// Dashboard layout shell — sidebar + header + content area.
// Presentational: receives user, onLogout, currentPath as props.

"use client";

import type { ReactNode } from "react";

export interface DashboardShellProps {
  user: { name: string };
  onLogout: () => Promise<void>;
  children: ReactNode;
  currentPath?: string;
}

const NAV_LINKS = [
  { href: "/tables", label: "Tables" },
  { href: "/players", label: "Players" },
  { href: "/alerts", label: "Alerts" },
] as const;

export function DashboardShell({
  user,
  onLogout,
  children,
  currentPath,
}: DashboardShellProps) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-56 border-r bg-muted/30 p-4 flex flex-col gap-1">
        <div className="mb-4 font-bold text-sm uppercase tracking-wider text-muted-foreground">
          Poker Shield
        </div>

        <nav className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = currentPath?.startsWith(link.href);
            return (
              <a
                key={link.href}
                href={link.href}
                data-active={isActive ? "true" : undefined}
                className={`rounded px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b px-6 py-3">
          <span className="text-sm text-muted-foreground">
            Logged in as <strong>{user.name}</strong>
          </span>
          <button
            onClick={onLogout}
            className="rounded px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            Log out
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

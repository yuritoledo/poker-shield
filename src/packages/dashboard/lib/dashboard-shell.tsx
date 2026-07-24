// Dashboard layout shell — sidebar + header + content area.
// Presentational: receives user, onLogout, currentPath as props.

"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  ShieldHalf,
  Table2,
  Users,
  BellRing,
  BarChart3,
  History,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface DashboardShellProps {
  user: { name: string };
  onLogout: () => Promise<void>;
  children: ReactNode;
  currentPath?: string;
}

const NAV_LINKS = [
  { href: "/tables", label: "Tables", icon: Table2 },
  { href: "/players", label: "Players", icon: Users },
  { href: "/reports", label: "Reports", icon: BarChart3 },
  { href: "/sessions", label: "Sessions", icon: History },
  { href: "/alerts", label: "Alerts", icon: BellRing },
] as const;

export function DashboardShell({
  user,
  onLogout,
  children,
  currentPath,
}: DashboardShellProps) {
  const { theme, setTheme } = useTheme();
  const initials = user.name.slice(0, 2).toUpperCase();
  const currentTitle = currentPath
    ? NAV_LINKS.find((link) => currentPath.startsWith(link.href))?.label ??
      "Dashboard"
    : "Dashboard";

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="flex w-56 flex-col border-r border-sidebar-border bg-sidebar">
        {/* Brand */}
        <div className="flex items-center gap-2 px-4 pt-4 pb-2">
          <ShieldHalf className="size-5 text-primary" />
          <span className="text-sm font-bold uppercase tracking-wider text-sidebar-foreground">
            Poker Shield
          </span>
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex flex-col gap-0.5 px-2">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = currentPath?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-sm px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-l-2 border-primary pl-3 text-primary"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className="size-4 shrink-0" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom: theme toggle + logout */}
        <div className="flex items-center justify-between border-t border-sidebar-border px-3 py-3">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onLogout}
            aria-label="Log out"
          >
            <LogOut className="size-4" />
          </Button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-sidebar-border px-6 py-3">
          <h1 className="text-sm font-medium text-foreground">
            {currentTitle}
          </h1>
          <div className="flex items-center gap-3">
            <span className="flex size-7 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
              {initials}
            </span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto bg-background p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

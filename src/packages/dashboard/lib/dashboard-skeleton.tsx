// Dashboard skeleton — pulsing placeholder that mirrors the DashboardShell layout.
// Used as the default loading state across dashboard routes.

export function DashboardSkeleton() {
  return (
    <div className="flex h-screen animate-pulse" role="status">
      {/* Sidebar skeleton */}
      <aside className="flex w-56 flex-col border-r border-sidebar-border bg-sidebar">
        <div className="flex items-center gap-2 px-4 pt-4 pb-2">
          <div className="size-5 rounded bg-muted-foreground/20" />
          <div className="h-4 w-24 rounded bg-muted-foreground/20" />
        </div>

        <nav className="mt-4 flex flex-col gap-0.5 px-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-3 rounded-sm px-3 py-2">
              <div className="size-4 rounded bg-muted-foreground/20" />
              <div className="h-3.5 w-16 rounded bg-muted-foreground/20" />
            </div>
          ))}
        </nav>

        <div className="flex-1" />

        <div className="flex items-center justify-between border-t border-sidebar-border px-3 py-3">
          <div className="size-7 rounded bg-muted-foreground/20" />
          <div className="size-7 rounded bg-muted-foreground/20" />
        </div>
      </aside>

      {/* Main area skeleton */}
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-sidebar-border px-6 py-3">
          <div className="h-4 w-24 rounded bg-muted-foreground/20" />
          <div className="size-7 rounded-full bg-muted-foreground/20" />
        </header>

        <main className="flex-1 overflow-auto bg-background p-6">
          {/* Content area placeholders */}
          <div className="space-y-4">
            <div className="h-4 w-3/4 rounded bg-muted-foreground/20" />
            <div className="h-4 w-1/2 rounded bg-muted-foreground/20" />
            <div className="h-4 w-5/6 rounded bg-muted-foreground/20" />
            <div className="h-4 w-2/3 rounded bg-muted-foreground/20" />
          </div>
        </main>
      </div>
    </div>
  );
}

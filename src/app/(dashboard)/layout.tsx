"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { DashboardShell } from "@/packages/dashboard";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const currentPath = usePathname();

  return (
    <DashboardShell
      user={{ name: "Operator" }}
      onLogout={async () => {}}
      currentPath={currentPath}
    >
      {children}
    </DashboardShell>
  );
}

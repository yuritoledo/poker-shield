"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DashboardShell } from "@/packages/dashboard";

import { useAuthStore } from "@/packages/auth";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = useAuthStore((s) => s.session);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();
  const currentPath = usePathname();

  useEffect(() => {
    if (!session) router.replace("/");
  }, [session, router]);

  if (!session) return null;

  async function handleLogout() {
    document.cookie = "session=;path=/;max-age=0;samesite=lax";
    logout();
    router.push("/");
  }

  return (
    <DashboardShell
      user={{ name: session.user.name }}
      onLogout={handleLogout}
      currentPath={currentPath}
    >
      {children}
    </DashboardShell>
  );
}

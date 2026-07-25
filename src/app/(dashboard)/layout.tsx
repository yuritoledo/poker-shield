"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { DashboardShell } from "@/packages/dashboard";

import { useAuthStore } from "@/packages/auth";
export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = useAuthStore((s) => s.session);
  const isLoading = useAuthStore((s) => s.isLoading);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();
  const currentPath = usePathname();
  useEffect(() => {
    if (!isLoading && !session) router.replace("/");
  }, [session, isLoading, router]);

  if (isLoading) {
    return (
      <div role="status" className="flex min-h-screen items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

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

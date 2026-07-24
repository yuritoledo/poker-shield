// Login page — full-screen centered card with LoginForm

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldHalf } from "lucide-react";
import { LoginForm } from "@/packages/auth";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(email: string, password: string) {
    setIsLoading(true);
    setError(null);
    try {
      router.push("/tables");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#0f172a] p-4">
      {/* Subtle dot-grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <Card size="sm" className="relative w-full max-w-sm">
        <CardHeader className="items-center text-center">
          <ShieldHalf className="size-10 text-primary" />
          <CardTitle className="text-lg font-semibold">
            Poker Shield
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Sign in to your account
          </p>
        </CardHeader>
        <CardContent>
          <LoginForm
            onLogin={handleLogin}
            error={error}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}

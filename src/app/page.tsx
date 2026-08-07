// Login page — full-screen centered card with LoginForm

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldHalf } from "lucide-react";
import { LoginForm, useLoginMutation } from "@/packages/auth";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function LoginPage() {
  const router = useRouter();
  const loginMutation = useLoginMutation();

  useEffect(() => {
    if (loginMutation.isSuccess) router.push("/tables");
  }, [loginMutation.isSuccess, router]);

  function handleLogin(email: string, password: string) {
    loginMutation.mutate({ email, password });
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
            error={loginMutation.error?.message ?? null}
            isLoading={loginMutation.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}

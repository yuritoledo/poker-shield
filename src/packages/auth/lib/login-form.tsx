// Presentational login form — only receives props, zero external dependencies.
// Store integration lives in the controller hook, not here.

"use client";

import { useState } from "react";

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>;
  error: string | null;
  isLoading: boolean;
}

export function LoginForm({ onLogin, error, isLoading }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isLoading) return;
    await onLogin(email, password);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div role="alert" className="text-red-500 text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}

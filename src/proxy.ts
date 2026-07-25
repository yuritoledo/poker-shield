// Edge auth guard — redirects unauthenticated users to / on dashboard routes.
//
// Next.js 16 rename: this file replaces middleware.ts (deprecated).
// The named export is `proxy` instead of `middleware`.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PATHS = ["/tables", "/players", "/reports", "/sessions", "/alerts"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PROTECTED_PATHS.some((path) => pathname === path || pathname.startsWith(path + "/"))) {
    const sessionCookie = request.cookies.get("session");
    if (!sessionCookie?.value) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}
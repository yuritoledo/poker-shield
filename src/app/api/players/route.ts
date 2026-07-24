import { NextResponse } from "next/server";
import {
  getPlayersFromDb,
  flagPlayerInDb,
  adjustScoreInDb,
} from "@/packages/players/lib/db-queries";

export async function GET() {
  try {
    const players = getPlayersFromDb();
    return NextResponse.json(players);
  } catch {
    // DB unavailable — fall back to mock store
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { getPlayers } = require("@/packages/players/lib/mock-store");
    return NextResponse.json(getPlayers());
  }
}

export async function PATCH(req: Request) {
  try {
    const body = (await req.json()) as {
      action: "flag" | "adjust-score";
      playerId: string;
      delta?: number;
    };

    if (body.action === "flag") {
      flagPlayerInDb(body.playerId);
    } else if (body.action === "adjust-score" && typeof body.delta === "number") {
      adjustScoreInDb(body.playerId, body.delta);
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    // Fallback to mock store
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { flagPlayer, adjustScore } = require("@/packages/players/lib/mock-store");
    try {
      const body = (await req.json()) as {
        action: string;
        playerId: string;
        delta?: number;
      };
      if (body.action === "flag") flagPlayer(body.playerId);
      else if (body.action === "adjust-score") adjustScore(body.playerId, body.delta ?? 0);
    } catch {}
    return NextResponse.json({ ok: true });
  }
}

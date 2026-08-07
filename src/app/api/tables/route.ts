import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { getTables } = await import("@/packages/tables-dashboard/lib/mock-store");
    return NextResponse.json(getTables());
  } catch {
    return NextResponse.json({ error: "Failed to fetch tables" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = (await req.json()) as { action: "toggle"; tableId: string };

    if (body.action !== "toggle") {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const { toggleTable } = await import("@/packages/tables-dashboard/lib/mock-store");
    toggleTable(body.tableId);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to update table" }, { status: 500 });
  }
}

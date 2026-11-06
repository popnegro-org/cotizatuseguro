import { NextResponse } from "next/server";
import { getHealthIntegrations } from "./config";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "cotizatuseguro",
    integrations: getHealthIntegrations()
  }, { headers: { "Cache-Control": "no-store" } });
}

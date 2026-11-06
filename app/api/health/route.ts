import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const pixelId = process.env.META_PIXEL_ID?.trim()
    || process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
  const metaPixelConfigured = Boolean(pixelId);
  const metaCapiConfigured = Boolean(
    pixelId && process.env.META_CAPI_ACCESS_TOKEN?.trim()
  );

  return NextResponse.json({
    ok: true,
    service: "cotizatuseguro",
    integrations: {
      hubspotConfigured: Boolean(process.env.HUBSPOT_ACCESS_TOKEN),
      whatsappConfigured: Boolean(process.env.NEXT_PUBLIC_WHATSAPP_BUSINESS_NUMBER),
      gtmConfigured: Boolean(process.env.NEXT_PUBLIC_GTM_ID),
      metaPixelConfigured,
      metaCapiConfigured
    }
  }, { headers: { "Cache-Control": "no-store" } });
}

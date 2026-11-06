export type HealthIntegrations = {
  hubspotConfigured: boolean;
  whatsappConfigured: boolean;
  gtmConfigured: boolean;
  metaPixelConfigured: boolean;
  metaCapiConfigured: boolean;
};

export function getHealthIntegrations(
  env: Record<string, string | undefined> = process.env
): HealthIntegrations {
  const pixelId = env.META_PIXEL_ID?.trim() || env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
  return {
    hubspotConfigured: Boolean(env.HUBSPOT_ACCESS_TOKEN?.trim()),
    whatsappConfigured: Boolean(env.NEXT_PUBLIC_WHATSAPP_BUSINESS_NUMBER?.trim()),
    gtmConfigured: Boolean(env.NEXT_PUBLIC_GTM_ID?.trim()),
    metaPixelConfigured: Boolean(pixelId),
    metaCapiConfigured: Boolean(pixelId && env.META_CAPI_ACCESS_TOKEN?.trim())
  };
}

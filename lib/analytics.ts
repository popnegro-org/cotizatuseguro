import { hasAcceptedAnalyticsConsent } from "./analytics-consent";

/** Client-side analytics helpers. Only fire after explicit measurement consent. */
export function track(event: string, params: Record<string, string> = {}, eventCallback?: () => void) {
  if (typeof window === "undefined" || !hasAcceptedAnalyticsConsent()) {
    eventCallback?.();
    return;
  }

  const w = window as Window & {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
  };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event,
    ...params,
    ...(eventCallback ? { eventCallback, eventTimeout: 1200 } : {})
  });

  // Meta Pixel events are handled only by an optional fbq installed through GTM.
  if (w.fbq) {
    const productName = params.insurance_product || "seguro";
    if (event === "insurance_product_select") {
      w.fbq("track", "ViewContent", { content_name: productName, content_category: "insurance" });
    } else if (event === "generate_lead") {
      w.fbq(
        "track",
        "Lead",
        { content_name: productName, content_category: "insurance" },
        ...(params.event_id ? [{ eventID: params.event_id }] : [])
      );
    } else if (event === "whatsapp_click") {
      w.fbq("track", "Contact", { content_name: productName, content_category: "insurance" });
    }
  }
}

export function trackAndWait(event: string, params: Record<string, string> = {}) {
  return new Promise<void>((resolve) => {
    let settled = false;
    const timeoutId = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      resolve();
    }, 1200);
    const finish = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeoutId);
      resolve();
    };
    track(event, params, finish);
  });
}

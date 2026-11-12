export const ANALYTICS_CONSENT_KEY = "analytics-consent";

export type AnalyticsConsent = "unknown" | "accepted" | "rejected";

export function readAnalyticsConsent(): AnalyticsConsent {
  try {
    const value = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    return value === "accepted" || value === "rejected" ? value : "unknown";
  } catch {
    return "unknown";
  }
}

export function writeAnalyticsConsent(value: Exclude<AnalyticsConsent, "unknown">): void {
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
  } catch {
    // Storage can be unavailable in private browsing; keep the in-memory choice.
  }
}

export function hasAcceptedAnalyticsConsent(): boolean {
  return readAnalyticsConsent() === "accepted";
}

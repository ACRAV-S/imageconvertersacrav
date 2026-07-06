export interface ConsentState {
  ad_storage: "granted" | "denied"
  ad_user_data: "granted" | "denied"
  ad_personalization: "granted" | "denied"
  analytics_storage: "granted" | "denied"
  functionality_storage: "granted" | "denied"
  personalization_storage: "granted" | "denied"
  security_storage: "granted" | "denied"
}

const STORAGE_KEY = "cookie-consent"

declare global {
  interface Window {
    dataLayer?: any[]
  }
}

function gtagPush(...args: any[]) {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(args)
}

export function getStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? (JSON.parse(stored) as ConsentState) : null
  } catch {
    return null
  }
}

export function setStoredConsent(state: ConsentState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function getDefaultConsent(): ConsentState {
  return {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "denied",
    personalization_storage: "denied",
    security_storage: "granted",
  }
}

export function grantAllConsent(): void {
  const state: ConsentState = {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "granted",
    functionality_storage: "granted",
    personalization_storage: "granted",
    security_storage: "granted",
  }
  setStoredConsent(state)
  gtagPush("consent", "update", state)
}

export function denyAllConsent(): void {
  const state = getDefaultConsent()
  setStoredConsent(state)
  gtagPush("consent", "update", state)
}

export function updateConsent(updates: Partial<ConsentState>): void {
  const current = getStoredConsent() || getDefaultConsent()
  const state = { ...current, ...updates }
  setStoredConsent(state)
  gtagPush("consent", "update", state)
}

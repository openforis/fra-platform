import posthog from 'posthog-js'

export const capture = (eventName: string, params: Record<string, unknown>): void => {
  // gtag is defined in index.html only for prod
  // @ts-ignore
  window.gtag?.('event', eventName, params)
  if (posthog.__loaded) posthog.capture(eventName, params)
}

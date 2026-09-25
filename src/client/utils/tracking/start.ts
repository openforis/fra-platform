import posthog from 'posthog-js'

// PostHog only starts after consent: even its config and flags requests would send the visitor's IP address
export const start = (): void => {
  if (!posthog.__loaded) {
    // @ts-ignore
    posthog.init(__POSTHOG_KEY__, {
      api_host: 'https://eu.i.posthog.com',
      defaults: '2026-05-30',
      disable_surveys: true,
      respect_dnt: true,
    })
  }
  posthog.opt_in_capturing({ captureEventName: false })
}

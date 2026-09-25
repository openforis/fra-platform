import posthog from 'posthog-js'

export const init = (): void => {
  // PostHog only starts when FRA_POSTHOG_KEY is set at build time
  // @ts-ignore
  const key = __POSTHOG_KEY__
  if (!key) return

  posthog.init(key, {
    api_host: 'https://eu.i.posthog.com',
    defaults: '2026-05-30',
    disable_surveys: true,
    respect_dnt: true,
  })
}

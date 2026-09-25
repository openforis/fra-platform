import posthog from 'posthog-js'

import { consentCookieName, ConsentStatus } from 'meta/tracking/consent'

import { start } from 'client/utils/tracking/start'

// 1 year
const cookieAge = 365 * 24 * 60 * 60

export const setConsent = (status: ConsentStatus): void => {
  document.cookie = `${consentCookieName}=${status}; max-age=${cookieAge}; path=/; SameSite=Lax`

  if (status === ConsentStatus.granted) start()
  else if (posthog.__loaded) posthog.opt_out_capturing()
}

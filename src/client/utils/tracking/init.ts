import { consentCookieName, ConsentStatus } from 'meta/tracking/consent'

import { isEnabled } from 'client/utils/tracking/isEnabled'
import { start } from 'client/utils/tracking/start'

export const init = (): void => {
  if (!isEnabled()) return

  if (document.cookie.includes(`${consentCookieName}=${ConsentStatus.granted}`)) start()
}

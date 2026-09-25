import { capture } from 'client/utils/tracking/capture'
import { init } from 'client/utils/tracking/init'
import { isEnabled } from 'client/utils/tracking/isEnabled'
import { setConsent } from 'client/utils/tracking/setConsent'

export const Tracking = {
  capture,
  init,
  isEnabled,
  setConsent,
}

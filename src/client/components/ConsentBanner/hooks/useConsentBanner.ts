import { useState } from 'react'

import { ConsentStatus } from 'meta/tracking/consent'

import { useIsPrintRoute } from 'client/hooks/routes'
import { Tracking } from 'client/utils/tracking'

const cookieName = 'analyticsConsent'

type Returned = {
  choose: (status: ConsentStatus) => void
  isOpen: boolean
}
// 1 year
const cookieAge = 365 * 24 * 60 * 60

export const useConsentBanner = (): Returned => {
  const { print } = useIsPrintRoute()
  const [isChosen, setIsChosen] = useState<boolean>(document.cookie.includes(`${cookieName}=`))

  const choose = (status: ConsentStatus): void => {
    document.cookie = `${cookieName}=${status}; max-age=${cookieAge}; path=/; SameSite=Lax`
    setIsChosen(true)
  }

  return { choose, isOpen: Tracking.isEnabled() && !isChosen && !print }
}

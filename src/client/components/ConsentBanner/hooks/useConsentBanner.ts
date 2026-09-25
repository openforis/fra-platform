import { useEffect } from 'react'

import { consentCookieName, ConsentStatus } from 'meta/tracking/consent'

import { useAppDispatch } from 'client/store/hooks'
import { ConsentActions } from 'client/store/ui/consent/actions'
import { useIsConsentOpen } from 'client/store/ui/consent/hooks'
import { useIsPrintRoute } from 'client/hooks/routes'
import { Tracking } from 'client/utils/tracking'

type Returned = {
  choose: (status: ConsentStatus) => void
  isOpen: boolean
}
// 1 year
const cookieAge = 365 * 24 * 60 * 60

export const useConsentBanner = (): Returned => {
  const dispatch = useAppDispatch()
  const { print } = useIsPrintRoute()
  const isOpen = useIsConsentOpen()

  useEffect(() => {
    if (Tracking.isEnabled() && !document.cookie.includes(`${consentCookieName}=`)) dispatch(ConsentActions.open())
  }, [dispatch])

  const choose = (status: ConsentStatus): void => {
    document.cookie = `${consentCookieName}=${status}; max-age=${cookieAge}; path=/; SameSite=Lax`
    dispatch(ConsentActions.close())
  }

  return { choose, isOpen: isOpen && !print }
}

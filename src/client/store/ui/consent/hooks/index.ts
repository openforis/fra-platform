import { useAppSelector } from 'client/store/hooks'
import { ConsentSelectors } from 'client/store/ui/consent/selectors'

export const useIsConsentOpen = (): boolean => useAppSelector(ConsentSelectors.isOpen)

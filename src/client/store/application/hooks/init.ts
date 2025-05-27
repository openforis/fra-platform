import { ApplicationSelectors } from 'client/store/application/selectors'
import { useAppSelector } from 'client/store/hooks'

export const useIsAppInitialized = () => useAppSelector(ApplicationSelectors.isAppInitialized)

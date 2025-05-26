import { AreaSelectors } from 'client/store/area/selectors'
import { useAppSelector } from 'client/store/hooks'

export const useIsUpdatingCountry = (): boolean => useAppSelector(AreaSelectors.isUpdatingCountry)

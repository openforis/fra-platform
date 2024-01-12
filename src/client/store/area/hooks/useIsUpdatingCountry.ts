import { AreaSelectors } from 'client/store/area/selectors'
import { useAppSelector } from 'client/store/store'

export const useIsUpdatingCountry = (): boolean => useAppSelector(AreaSelectors.isUpdatingCountry)

import { useAppSelector } from '../../../store'
import { Objects } from '@core/utils'

export { useInitCountry } from './useInitCountry'
export const useIsCountryStatusLoaded = () => useAppSelector((state) => !Objects.isEmpty(state.country.status))

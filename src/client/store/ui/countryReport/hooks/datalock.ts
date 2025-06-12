import { useAppSelector } from 'client/store/hooks'
import { CountryReportSelectors } from 'client/store/ui/countryReport/selectors'

export const useIsDataLocked = (): boolean => useAppSelector(CountryReportSelectors.isDataLocked)

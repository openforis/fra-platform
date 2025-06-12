import { useAppSelector } from 'client/store/hooks'
import { CountryReportSelector } from 'client/store/ui/countryReport/selectors'

export const useIsDataLocked = (): boolean => useAppSelector(CountryReportSelector.isDataLocked)

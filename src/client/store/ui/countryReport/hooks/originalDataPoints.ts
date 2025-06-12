import { useAppSelector } from 'client/store/hooks'
import { CountryReportSelector } from 'client/store/ui/countryReport/selectors'

export const useShowOriginalDatapoints = (): boolean => useAppSelector(CountryReportSelector.showOriginalDataPoint)

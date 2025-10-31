import { CountryIso } from 'meta/area/countryIso'

import { useAppSelector } from 'client/store/hooks'
import { CountryReportSelectors } from 'client/store/ui/countryReport/selectors'

export const useGlobalCountries = (): Array<CountryIso> => useAppSelector(CountryReportSelectors.getGlobalCountries)

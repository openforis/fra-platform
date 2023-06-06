import { Areas } from 'meta/area'

import { useCountryIso } from './useCountryIso'

export const useIsDataExportView = () => {
  const countryIso = useCountryIso()
  return countryIso && !Areas.isISOCountry(countryIso)
}

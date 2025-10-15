import { Areas } from 'meta/area'

import { useCountryRouteParams } from 'client/hooks/routeParams'

export const useIsDataExportView = (): boolean => {
  const { countryIso } = useCountryRouteParams()

  return countryIso && !Areas.isISOCountry(countryIso)
}

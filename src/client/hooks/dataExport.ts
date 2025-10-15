import { Areas } from 'meta/area'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useIsDataExportView = (): boolean => {
  const { countryIso } = useCountryRouteParams()

  return countryIso && !Areas.isISOCountry(countryIso)
}

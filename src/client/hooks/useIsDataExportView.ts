import { Areas } from 'meta/area'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useIsDataExportView = () => {
  const { countryIso } = useCountryRouteParams()

  return countryIso && !Areas.isISOCountry(countryIso)
}

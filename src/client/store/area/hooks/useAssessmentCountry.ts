import { Country } from 'meta/area'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'

import { useCountry } from './useCountry'

export const useAssessmentCountry = (): Country => {
  const { countryIso } = useCountryRouteParams()
  if (!countryIso) throw new Error(`Unable to find countryIso parameter`)
  return useCountry(countryIso)
}

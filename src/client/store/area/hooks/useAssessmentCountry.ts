import { Country } from 'meta/area'

import { useCountryIso } from 'client/hooks'

import { useCountry } from './useCountry'

export const useAssessmentCountry = (): Country => {
  // const { countryIso } = useCountryRouteParams()
  const countryIso = useCountryIso()

  if (!countryIso) throw new Error(`Unable to find countryIso parameter`)

  return useCountry(countryIso)
}

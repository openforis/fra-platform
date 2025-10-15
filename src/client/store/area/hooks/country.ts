import { Country, CountryIso } from 'meta/area'

import { AreaSelectors } from 'client/store/area/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useCountryIso } from 'client/hooks/country'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'

export const useCountry = (countryIso: CountryIso): Country => {
  const { assessmentName, cycleName } = useCycleRouteParams()

  return useAppSelector((state) => AreaSelectors.getCountry(state, assessmentName, cycleName, countryIso))
}

export const useAssessmentCountry = (): Country => {
  // const { countryIso } = useCountryRouteParams()
  const countryIso = useCountryIso()

  if (!countryIso) throw new Error(`Unable to find countryIso parameter`)

  return useCountry(countryIso)
}

export const useIsUpdatingCountry = (): boolean => useAppSelector(AreaSelectors.isUpdatingCountry)

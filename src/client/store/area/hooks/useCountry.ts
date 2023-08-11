import { Country, CountryIso } from 'meta/area'

import { AreaSelectors } from 'client/store/area/selectors'
import { useAppSelector } from 'client/store/store'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'

export const useCountry = (countryIso: CountryIso): Country => {
  const { assessmentName, cycleName } = useCycleRouteParams()
  return useAppSelector((state) => AreaSelectors.getCountry(state, assessmentName, cycleName, countryIso))
}

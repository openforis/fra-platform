import { CountryIso } from 'meta/area/countryIso'

import { ValidationsSelectors } from 'client/store/data/tableData/validations/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'

export const useNationalDataPointValidationsFetched = (): boolean => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useAppSelector((state) =>
    ValidationsSelectors.nationalDataPointValidationsFetched(state, assessmentName, cycleName, countryIso)
  )
}

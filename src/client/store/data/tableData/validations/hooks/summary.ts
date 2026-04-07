import { CountryIso } from 'meta/area/countryIso'
import { ValidationSummary } from 'meta/assessment/validation/summary'

import { ValidationsSelectors } from 'client/store/data/tableData/validations/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'

export const useValidationSummary = (): ValidationSummary => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useAppSelector((state) => ValidationsSelectors.getSummary(state, assessmentName, cycleName, countryIso))
}

import { CountryIso } from 'meta/area/countryIso'
import { ValidationSummary } from 'meta/assessment/validation/summary'
import { UUID } from 'meta/uuid/uuid'

import { ValidationsSelectors } from 'client/store/data/validations/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'

export const useValidationSummary = (): ValidationSummary => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useAppSelector((state) => ValidationsSelectors.getSummary(state, assessmentName, cycleName, countryIso))
}

export const useSummaryHasErrors = (): boolean => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useAppSelector((state) =>
    ValidationsSelectors.getSummaryHasErrors(state, assessmentName, cycleName, countryIso)
  )
}

export const useSummarySectionHasErrors = (sectionUuid?: UUID): boolean => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useAppSelector((state) =>
    ValidationsSelectors.getSummarySectionHasErrors(state, assessmentName, cycleName, countryIso, sectionUuid)
  )
}

export const useSummarySubSectionHasErrors = (subSectionUuid?: UUID): boolean => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useAppSelector((state) =>
    ValidationsSelectors.getSummarySubSectionHasErrors(state, assessmentName, cycleName, countryIso, subSectionUuid)
  )
}

import { CountryIso } from 'meta/area/countryIso'
import { ValidationSummary } from 'meta/assessment/validation/summary'
import { UUID } from 'meta/uuid/uuid'

import { SummaryValidationSelectors } from 'client/store/data/validations/summary/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'

export const useValidationSummary = (): ValidationSummary => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useAppSelector((state) => SummaryValidationSelectors.get(state, assessmentName, cycleName, countryIso))
}

export const useSummaryHasErrors = (): boolean => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useAppSelector((state) => SummaryValidationSelectors.hasErrors(state, assessmentName, cycleName, countryIso))
}

export const useSummarySectionHasErrors = (sectionUuid?: UUID): boolean => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useAppSelector((state) =>
    SummaryValidationSelectors.sectionHasErrors(state, assessmentName, cycleName, countryIso, sectionUuid)
  )
}

export const useSummarySubSectionHasErrors = (subSectionUuid?: UUID): boolean => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useAppSelector((state) =>
    SummaryValidationSelectors.subSectionHasErrors(state, assessmentName, cycleName, countryIso, subSectionUuid)
  )
}

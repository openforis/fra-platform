import { CountryIso } from 'meta/area/countryIso'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import type { DataSourceRowValidations } from 'meta/assessment/validation/description'
import { Validation } from 'meta/assessment/validation/validation'

import { ValidationsSelectors } from 'client/store/data/validations/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'

type DescriptionValidationProps = {
  name: CommentableDescriptionName
  sectionName: SectionName
}

type DescriptionValidationReturned = Validation

export const useDescriptionValidation = (props: DescriptionValidationProps): DescriptionValidationReturned => {
  const { name, sectionName } = props

  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useAppSelector((state) => {
    return ValidationsSelectors.getDescriptionValidation(
      state,
      assessmentName,
      cycleName,
      countryIso,
      sectionName,
      name
    )
  })
}

type DataSourceValidationsProps = {
  sectionName: SectionName
}

export const useDataSourceValidations = (props: DataSourceValidationsProps): DataSourceRowValidations => {
  const { sectionName } = props

  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useAppSelector((state) => {
    return ValidationsSelectors.getDataSourceValidations(state, assessmentName, cycleName, countryIso, sectionName)
  })
}

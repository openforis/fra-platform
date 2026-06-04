import { CountryIso } from 'meta/area/countryIso'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import type { DataSourceValidation } from 'meta/assessment/validation/description'
import { Validation } from 'meta/assessment/validation/validation'
import { UUID } from 'meta/uuid/uuid'

import { ValidationsSelectors } from 'client/store/data/tableData/validations/selectors'
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

type DataSourceValidationProps = {
  sectionName: SectionName
  uuid: UUID
}

export const useDataSourceValidation = (props: DataSourceValidationProps): DataSourceValidation => {
  const { sectionName, uuid } = props

  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useAppSelector((state) => {
    return ValidationsSelectors.getDataSourceValidation(state, assessmentName, cycleName, countryIso, sectionName, uuid)
  })
}

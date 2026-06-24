import { SectionName, SectionNames } from 'meta/assessment/section'
import { NDPValidation, RecordNDPValidations } from 'meta/assessment/validation/nationalDataPoint'
import { ValidationSummary } from 'meta/assessment/validation/summary'
import { Validation } from 'meta/assessment/validation/validation'

type Props = {
  nationalDataPointValidations?: RecordNDPValidations
}

type Returned = ValidationSummary['nationalDataPoints']

const ndpSectionNames: Array<SectionName> = [SectionNames.extentOfForest, SectionNames.forestCharacteristics]

const _isInvalid = (validation?: Validation): boolean => {
  return validation?.valid === false
}

// Returns true on the first validation error found.
const _hasError = (ndpValidation: NDPValidation): boolean => {
  const { comments, dataSources, nationalClasses, year } = ndpValidation

  if (_isInvalid(year)) return true

  if (Object.values(comments ?? {}).some((comment) => _isInvalid(comment))) return true

  const dataSourceInvalid = Object.values(dataSources ?? {}).some((dataSource) => {
    return Object.values(dataSource).some((field) => _isInvalid(field))
  })
  if (dataSourceInvalid) return true

  const nationalClassInvalid = Object.values(nationalClasses ?? {}).some((nationalClass) => {
    return Object.values(nationalClass).some((field) => _isInvalid(field))
  })
  if (nationalClassInvalid) return true

  return false
}

export const calculateSummary = (props: Props): Returned => {
  const { nationalDataPointValidations = {} } = props

  const valid = !Object.values(nationalDataPointValidations).some((ndpValidation) => _hasError(ndpValidation))

  const summary: Returned = {}
  ndpSectionNames.forEach((sectionName) => {
    summary[sectionName] = { valid }
  })

  return summary
}

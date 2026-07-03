import { SectionName, SectionNames } from 'meta/assessment/section'
import { RecordNDPValidations } from 'meta/assessment/validation/nationalDataPoint'
import { ValidationSummary } from 'meta/assessment/validation/summary'

import { hasError } from './hasError'

type Props = {
  nationalDataPointValidations?: RecordNDPValidations
}

type Returned = ValidationSummary['nationalDataPoints']

const ndpSectionNames: Array<SectionName> = [SectionNames.extentOfForest, SectionNames.forestCharacteristics]

export const calculateSummary = (props: Props): Returned => {
  const { nationalDataPointValidations = {} } = props

  const valid = !Object.values(nationalDataPointValidations).some((ndpValidation) => hasError(ndpValidation))

  const summary: Returned = {}
  ndpSectionNames.forEach((sectionName) => {
    summary[sectionName] = { valid }
  })

  return summary
}

import { SectionName } from 'meta/assessment/section'
import { RecordNDPValidations } from 'meta/assessment/validation/nationalDataPoint'
import { ValidationSummary } from 'meta/assessment/validation/summary'

import { hasSectionError } from './hasSectionError'

type Props = {
  nationalDataPointValidations?: RecordNDPValidations
  sectionNames: Array<SectionName>
}

type Returned = ValidationSummary['nationalDataPoints']

export const calculateSummary = (props: Props): Returned => {
  const { nationalDataPointValidations = {}, sectionNames } = props
  const ndpValidations = Object.values(nationalDataPointValidations)

  const summary: Returned = {}
  sectionNames.forEach((sectionName) => {
    const valid = !ndpValidations.some((nationalDataPointValidation) =>
      hasSectionError({ nationalDataPointValidation, sectionName })
    )
    summary[sectionName] = { valid }
  })

  return summary
}

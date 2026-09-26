import { SectionName } from 'meta/assessment/section'
import { RecordNDPValidations } from 'meta/assessment/validation/nationalDataPoint'
import { NationalDataPointValidations } from 'meta/assessment/validation/nationalDataPointValidations'
import { ValidationSummary } from 'meta/assessment/validation/summary'

type Props = {
  nationalDataPointValidations: RecordNDPValidations
  summary: ValidationSummary
}

export const updateNationalDataPoints = (props: Props): void => {
  const { nationalDataPointValidations, summary } = props

  const sectionNames = Object.keys(summary.nationalDataPoints) as Array<SectionName>

  summary.nationalDataPoints = NationalDataPointValidations.calculateSummary({
    nationalDataPointValidations,
    sectionNames,
  })
}

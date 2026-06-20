import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { NDPValidation } from 'meta/assessment/validation/nationalDataPoint'
import { NationalDataPointValidator } from 'meta/assessment/validation/nationalDataPointValidator/nationalDataPointValidator'

type Props = {
  nationalDataPoint: OriginalDataPoint
}

export const validateNationalDataPoint = (props: Props): NDPValidation => {
  const { nationalDataPoint } = props
  return NationalDataPointValidator.validate({ nationalDataPoint })
  // TODO: Validate national data point data sources
}

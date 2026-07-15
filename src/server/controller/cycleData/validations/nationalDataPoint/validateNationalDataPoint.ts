import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { NDPValidation } from 'meta/assessment/validation/nationalDataPoint'
import { NationalDataPointValidator } from 'meta/assessment/validation/nationalDataPointValidator/nationalDataPointValidator'

type Props = {
  nationalDataPoint: OriginalDataPoint
  validation: NDPValidation
}

export const validateNationalDataPoint = (props: Props): NDPValidation => {
  const { nationalDataPoint, validation } = props
  return NationalDataPointValidator.validate({ nationalDataPoint, validation })
  // NDP data source references are validated by the links flow.
}

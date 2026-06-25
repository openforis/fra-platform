import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { NDPValidation } from 'meta/assessment/validation/nationalDataPoint'
import { validateNationalClasses } from 'meta/assessment/validation/nationalDataPointValidator/validateNationalClasses'
import { validateYear } from 'meta/assessment/validation/nationalDataPointValidator/validateYear'

type Props = {
  nationalDataPoint: OriginalDataPoint
  validation: NDPValidation
}

export const validate = (props: Props): NDPValidation => {
  const { nationalDataPoint, validation: currentValidation } = props
  const validation = validateYear({ nationalDataPoint, validation: currentValidation })

  return validateNationalClasses({ nationalDataPoint, validation })
}

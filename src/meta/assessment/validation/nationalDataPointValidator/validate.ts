import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { NDPValidation } from 'meta/assessment/validation/nationalDataPoint'
import { validateNationalClasses } from 'meta/assessment/validation/nationalDataPointValidator/validateNationalClasses'
import { validateYear } from 'meta/assessment/validation/nationalDataPointValidator/validateYear'

type Props = {
  nationalDataPoint: OriginalDataPoint
}

// Validates the national data point from scratch
export const validate = (props: Props): NDPValidation => {
  const { nationalDataPoint } = props

  const validation: NDPValidation = { odpId: nationalDataPoint.id }

  const year = validateYear({ nationalDataPoint })
  if (year) validation.year = year

  const nationalClasses = validateNationalClasses({ nationalDataPoint })
  if (nationalClasses) validation.nationalClasses = nationalClasses

  return validation
}

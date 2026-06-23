import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { NDPValidation } from 'meta/assessment/validation/nationalDataPoint'
import { validateNationalClasses } from 'meta/assessment/validation/nationalDataPointValidator/validateNationalClasses'
import { validateYear } from 'meta/assessment/validation/nationalDataPointValidator/validateYear'
import { Objects } from 'utils/objects'

type Props = {
  nationalDataPoint: OriginalDataPoint
}

export const validate = (props: Props): NDPValidation => {
  const { nationalDataPoint } = props
  const validation: NDPValidation = {}

  const yearValidation = validateYear({ nationalDataPoint })
  if (!Objects.isNil(yearValidation)) validation.year = yearValidation

  const nationalClassesValidation = validateNationalClasses({ nationalDataPoint })
  if (!Objects.isNil(nationalClassesValidation)) validation.nationalClasses = nationalClassesValidation

  return validation
}

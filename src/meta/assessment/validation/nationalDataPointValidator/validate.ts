import { ODPNationalClass, OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { NDPValidation } from 'meta/assessment/validation/nationalDataPoint'
import { validateNationalClass } from 'meta/assessment/validation/nationalDataPointValidator/validateNationalClass/validateNationalClass'
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

  nationalDataPoint.nationalClasses?.forEach((nationalClass: ODPNationalClass, index) => {
    const { placeHolder, uuid } = nationalClass
    if (placeHolder || Objects.isEmpty(uuid)) return

    const nationalClassValidation = validateNationalClass({ nationalDataPoint, index })
    if (Objects.isEmpty(nationalClassValidation)) return

    validation.nationalClasses ??= {}
    validation.nationalClasses[uuid] = nationalClassValidation
  })

  return validation
}

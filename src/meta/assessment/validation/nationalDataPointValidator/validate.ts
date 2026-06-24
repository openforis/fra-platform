import { ODPNationalClass, OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { NDPValidation } from 'meta/assessment/validation/nationalDataPoint'
import { validateNationalClass } from 'meta/assessment/validation/nationalDataPointValidator/validateNationalClass/validateNationalClass'
import { validateYear } from 'meta/assessment/validation/nationalDataPointValidator/validateYear'
import { Objects } from 'utils/objects'

type Props = {
  nationalDataPoint: OriginalDataPoint
  validation: NDPValidation
}

export const validate = (props: Props): NDPValidation => {
  const { nationalDataPoint, validation: currentValidation } = props
  const validation = validateYear({ nationalDataPoint, validation: currentValidation })

  delete validation.nationalClasses

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

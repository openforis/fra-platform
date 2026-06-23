import { ODPNationalClass, OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { NDPValidation } from 'meta/assessment/validation/nationalDataPoint'
import { validateNationalClass } from 'meta/assessment/validation/nationalDataPointValidator/validateNationalClass/validateNationalClass'
import { Objects } from 'utils/objects'

type Props = {
  nationalDataPoint: OriginalDataPoint
}

type Returned = NDPValidation['nationalClasses']

export const validateNationalClasses = (props: Props): Returned => {
  const { nationalDataPoint } = props
  const nationalClassesValidation: Returned = {}

  nationalDataPoint.nationalClasses?.forEach((nationalClass: ODPNationalClass, index) => {
    const { placeHolder, uuid } = nationalClass
    if (placeHolder || Objects.isEmpty(uuid)) return

    const nationalClassValidation = validateNationalClass({ nationalDataPoint, index })
    if (Objects.isEmpty(nationalClassValidation)) return

    nationalClassesValidation[uuid] = nationalClassValidation
  })

  if (Objects.isEmpty(nationalClassesValidation)) return undefined

  return nationalClassesValidation
}

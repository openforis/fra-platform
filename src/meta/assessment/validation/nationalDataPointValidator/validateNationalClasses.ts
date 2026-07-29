import { ODPNationalClass, OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { NDPValidation } from 'meta/assessment/validation/nationalDataPoint'
import { validateNationalClass } from 'meta/assessment/validation/nationalDataPointValidator/validateNationalClass/validateNationalClass'
import { Objects } from 'utils/objects'

type Props = {
  nationalDataPoint: OriginalDataPoint
}

// Returns undefined when every national class is valid.
export const validateNationalClasses = (props: Props): NDPValidation['nationalClasses'] => {
  const { nationalDataPoint } = props
  const nationalClassesValidation: NDPValidation['nationalClasses'] = {}

  nationalDataPoint.nationalClasses?.forEach((nationalClass: ODPNationalClass, index) => {
    const { uuid } = nationalClass
    if (Objects.isEmpty(uuid)) return

    const nationalClassValidation = validateNationalClass({ nationalDataPoint, index })
    if (Objects.isEmpty(nationalClassValidation)) return

    nationalClassesValidation[uuid] = nationalClassValidation
  })

  if (Objects.isEmpty(nationalClassesValidation)) return undefined

  return nationalClassesValidation
}

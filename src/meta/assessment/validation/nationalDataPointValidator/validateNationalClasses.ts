import { ODPNationalClass, OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { NDPValidation } from 'meta/assessment/validation/nationalDataPoint'
import { validateNationalClass } from 'meta/assessment/validation/nationalDataPointValidator/validateNationalClass/validateNationalClass'
import { Objects } from 'utils/objects'

type Props = {
  nationalDataPoint: OriginalDataPoint
  validation: NDPValidation
}

type Returned = NDPValidation['nationalClasses']

export const validateNationalClasses = (props: Props): NDPValidation => {
  const { nationalDataPoint, validation } = props
  const { id } = nationalDataPoint
  const nationalClassesValidation: Returned = {}

  nationalDataPoint.nationalClasses?.forEach((nationalClass: ODPNationalClass, index) => {
    const { uuid } = nationalClass
    if (Objects.isEmpty(uuid)) return

    const nationalClassValidation = validateNationalClass({ nationalDataPoint, index })
    if (Objects.isEmpty(nationalClassValidation)) return

    nationalClassesValidation[uuid] = nationalClassValidation
  })

  if (Objects.isEmpty(nationalClassesValidation)) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { nationalClasses: _, ...withoutNationalClassesValidation } = validation
    return { ...withoutNationalClassesValidation, odpId: id }
  }

  return { ...validation, odpId: id, nationalClasses: nationalClassesValidation }
}

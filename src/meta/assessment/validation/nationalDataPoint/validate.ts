import { ODPs } from 'meta/assessment/odps'
import { ODPNationalClass, OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { validateNationalClass } from 'meta/assessment/validation/nationalDataPoint/validateNationalClass'
import { NDPValidation } from 'meta/assessment/validation/ndp'
import { Objects } from 'utils/objects'

type Props = {
  nationalDataPoint: OriginalDataPoint
}

export const validate = (props: Props): NDPValidation => {
  const { nationalDataPoint } = props
  const validation: NDPValidation = {}

  // TODO: move validation out of ODPs object.
  if (!ODPs.validateYear(nationalDataPoint)) {
    validation.year = { valid: false }
  }

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

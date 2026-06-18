import { ODPs } from 'meta/assessment/odps'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { NDPValidation } from 'meta/assessment/validation/ndp'
import { Objects } from 'utils/objects'

import { buildNationalClassValidation } from './buildNationalClassValidation'

type Props = {
  nationalDataPoint: OriginalDataPoint
}

export const validateNationalDataPoint = (props: Props): NDPValidation => {
  const { nationalDataPoint } = props
  const validation: NDPValidation = {}

  if (!ODPs.validateYear(nationalDataPoint)) {
    validation.year = { valid: false }
  }

  nationalDataPoint.nationalClasses?.forEach((nationalClass, index) => {
    const { placeHolder, uuid } = nationalClass
    if (placeHolder || Objects.isEmpty(uuid)) return

    const nationalClassValidation = buildNationalClassValidation({ nationalDataPoint, index })
    if (Objects.isEmpty(nationalClassValidation)) return

    validation.nationalClasses ??= {}
    validation.nationalClasses[uuid] = nationalClassValidation
  })

  return validation
}

import { ODPNationalClass, OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import {
  NDPNationalClassValidation,
  NDPNationalClassValidationField,
} from 'meta/assessment/validation/nationalDataPoint'
import { validateArea } from 'meta/assessment/validation/nationalDataPointValidator/validateNationalClass/rules/validateArea'
import { validateName } from 'meta/assessment/validation/nationalDataPointValidator/validateNationalClass/rules/validateName'
import { Validation } from 'meta/assessment/validation/validation'
import { Objects } from 'utils/objects'

type Props = {
  index: number
  nationalDataPoint: OriginalDataPoint
}

type NationalClassRule = {
  field: NDPNationalClassValidationField
  validator: (props: { nationalClass: ODPNationalClass }) => Validation | undefined
}

const rules: Array<NationalClassRule> = [
  { field: 'name', validator: validateName },
  { field: 'area', validator: validateArea },
  // TODO: Validate percentages
]

export const validateNationalClass = (props: Props): NDPNationalClassValidation => {
  const { index, nationalDataPoint } = props
  const nationalClass = nationalDataPoint.nationalClasses?.[index]

  if (Objects.isNil(nationalClass) || nationalClass.placeHolder) return {}

  return rules.reduce<NDPNationalClassValidation>((acc, { field, validator }) => {
    const fieldValidation = validator({ nationalClass })
    if (fieldValidation) acc[field] = fieldValidation
    return acc
  }, {})
}

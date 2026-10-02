import { ODPNationalClass, OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import {
  NDPNationalClassValidation,
  NDPNationalClassValidationField,
} from 'meta/assessment/validation/nationalDataPoint'
import { validateArea } from 'meta/assessment/validation/nationalDataPointValidator/validateNationalClass/rules/validateArea'
import { validateName } from 'meta/assessment/validation/nationalDataPointValidator/validateNationalClass/rules/validateName'
import {
  validateExtentOfForestPercentage,
  validateForestCharacteristicsPercentage,
  validateForestPlantationIntroducedPercentage,
  validatePrimaryForest,
} from 'meta/assessment/validation/nationalDataPointValidator/validateNationalClass/rules/validatePercentages'
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
  { field: 'extentOfForestPercentage', validator: validateExtentOfForestPercentage },
  { field: 'forestCharacteristicsPercentage', validator: validateForestCharacteristicsPercentage },
  { field: 'forestPlantationIntroducedPercentage', validator: validateForestPlantationIntroducedPercentage },
  { field: 'primaryForest', validator: validatePrimaryForest },
]

export const validateNationalClass = (props: Props): NDPNationalClassValidation => {
  const { index, nationalDataPoint } = props
  const nationalClass = nationalDataPoint.nationalClasses?.[index]

  if (Objects.isNil(nationalClass)) return {}

  return rules.reduce<NDPNationalClassValidation>((acc, { field, validator }) => {
    const fieldValidation = validator({ nationalClass })
    if (fieldValidation) acc[field] = fieldValidation
    return acc
  }, {})
}

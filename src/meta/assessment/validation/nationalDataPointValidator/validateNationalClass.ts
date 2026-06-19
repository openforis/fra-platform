import { ODPs } from 'meta/assessment/odps'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import {
  NDPNationalClassValidation,
  NDPNationalClassValidationField,
} from 'meta/assessment/validation/nationalDataPoint'
import { Validation } from 'meta/assessment/validation/validation'

type Props = {
  index: number
  nationalDataPoint: OriginalDataPoint
}

type PercentageValidation = {
  field: NDPNationalClassValidationField
  messageKey: 'classValueNotGreaterThan' | 'classValuesMustBeEqualTo'
  valid: boolean
}

const _getPercentageValidation = (
  props: PercentageValidation & { nationalClassName: string }
): Validation | undefined => {
  const { messageKey, nationalClassName, valid } = props

  if (valid) return undefined

  const message = { key: `generalValidation.${messageKey}`, params: { name: nationalClassName, value: '100%' } }
  return { valid: false, messages: [message] }
}

export const validateNationalClass = (props: Props): NDPNationalClassValidation => {
  const { index, nationalDataPoint } = props
  const nationalClass = nationalDataPoint.nationalClasses?.[index]
  // TODO: move validation out of ODPs object.
  const validation = ODPs.validateNationalClass(nationalDataPoint, index)

  const nationalClassName = nationalClass?.name ?? ''
  const nationalClassValidation: NDPNationalClassValidation = {}

  if (validation.validClassName === false) nationalClassValidation.name = { valid: false }

  if (validation.validArea === false) nationalClassValidation.area = { valid: false }

  const percentageValidations: Array<PercentageValidation> = [
    {
      field: 'extentOfForestPercentage',
      messageKey: 'classValueNotGreaterThan',
      valid: validation.validExtentOfForestPercentage,
    },
    {
      field: 'forestCharacteristicsPercentage',
      messageKey: 'classValuesMustBeEqualTo',
      valid: validation.validForestCharacteristicsPercentage,
    },
    {
      field: 'forestPlantationIntroducedPercentage',
      messageKey: 'classValueNotGreaterThan',
      valid: validation.validForestPlantationIntroducedPercent,
    },
    {
      field: 'primaryForest',
      messageKey: 'classValueNotGreaterThan',
      valid: validation.validPrimaryForest,
    },
  ]

  percentageValidations.forEach((percentageValidation) => {
    const { field } = percentageValidation
    const fieldValidation = _getPercentageValidation({ ...percentageValidation, nationalClassName })
    if (fieldValidation) nationalClassValidation[field] = fieldValidation
  })

  return nationalClassValidation
}

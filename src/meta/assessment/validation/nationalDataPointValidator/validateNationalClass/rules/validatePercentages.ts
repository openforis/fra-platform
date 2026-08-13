import { ODPNationalClass } from 'meta/assessment/originalDataPoint'
import { Validation } from 'meta/assessment/validation/validation'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

type Props = {
  nationalClass: ODPNationalClass
}

type PercentageMessageKey = 'classValueNotGreaterThan' | 'classValuesMustBeEqualTo'

const _percentageError = (nationalClass: ODPNationalClass, messageKey: PercentageMessageKey): Validation => ({
  valid: false,
  messages: [{ key: `generalValidation.${messageKey}`, params: { name: nationalClass.name ?? '', value: '100%' } }],
})

// Forest and other wooded land percentages must sum to at most 100%.
export const validateExtentOfForestPercentage = (props: Props): Validation | undefined => {
  const { nationalClass } = props

  const percentSum = Numbers.sum([nationalClass.forestPercent ?? 0, nationalClass.otherWoodedLandPercent ?? 0])
  if (Numbers.lessThanOrEqualTo(percentSum, 100)) return undefined
  return _percentageError(nationalClass, 'classValueNotGreaterThan')
}

// Forest characteristics percentages must sum to exactly 100%.
export const validateForestCharacteristicsPercentage = (props: Props): Validation | undefined => {
  const { nationalClass } = props

  if (!Numbers.greaterThan(nationalClass.forestPercent, 0)) return undefined
  const percentSum = Numbers.sum([
    nationalClass.forestNaturalPercent ?? 0,
    nationalClass.forestPlantationPercent ?? 0,
    nationalClass.otherPlantedForestPercent ?? 0,
  ])
  if (Numbers.eq(percentSum, 100)) return undefined
  return _percentageError(nationalClass, 'classValuesMustBeEqualTo')
}

// Forest plantation percentage, if provided, must be at most 100%.
export const validateForestPlantationIntroducedPercentage = (props: Props): Validation | undefined => {
  const { nationalClass } = props

  const percent = nationalClass.forestPlantationIntroducedPercent
  if (Objects.isEmpty(percent) || !Numbers.greaterThan(percent, 0)) return undefined
  if (Numbers.lessThanOrEqualTo(percent, 100)) return undefined
  return _percentageError(nationalClass, 'classValueNotGreaterThan')
}

// Primary forest percentage, if provided, must be at most 100%.
export const validatePrimaryForest = (props: Props): Validation | undefined => {
  const { nationalClass } = props

  const percent = nationalClass.forestNaturalForestOfWhichPrimaryForestPercent
  if (Objects.isEmpty(percent) || !Numbers.greaterThan(percent, 0)) return undefined
  if (Numbers.lessThanOrEqualTo(percent, 100)) return undefined
  return _percentageError(nationalClass, 'classValueNotGreaterThan')
}

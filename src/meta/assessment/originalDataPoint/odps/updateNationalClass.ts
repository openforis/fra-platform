import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ODPNationalClass, ODPNationalClassFactory } from '../odpNationalClass'
import { OriginalDataPoint } from '../originalDataPoint'
import { calculateValues as calculateODPValues } from './calc'

// Helper utility to calculate correct value for Classifications and definitions.
// - [1] If we have sum to 100%, we display empty cells in row as 0% [0]
// - [2] If total sum is not 100%, we display empty cells in row as empty [null]
const getValueOrNull = (value: string | null, rowIsMaxed: boolean): string | null => {
  if (rowIsMaxed) {
    // If row is 100% and current value is empty, return 0
    if (Objects.isEmpty(value)) return '0'
  }
  // If row is not 100%, return current value
  return value
}

type CalculateValuesProps = {
  odp: OriginalDataPoint
  index: number
  value: string
  field: keyof ODPNationalClass
}

const calculateValues = (props: CalculateValuesProps) => {
  const { odp, index, field, value } = props

  const prevValue = odp.nationalClasses[index][field] as string

  const nationalClass: ODPNationalClass = {
    ...Objects.cloneDeep(odp.nationalClasses[index]),
    [field]: value,
  }

  const {
    forestNaturalPercent,
    forestPlantationPercent,
    otherPlantedForestPercent,
    forestPercent,
    otherWoodedLandPercent,
    forestPlantationIntroducedPercent,
    forestNaturalForestOfWhichPrimaryForestPercent,
  } = nationalClass

  const rowIsMaxedForestCharacteristics = Numbers.eq(
    Numbers.sum([forestNaturalPercent, forestPlantationPercent, otherPlantedForestPercent]),
    100
  )

  const rowIsMaxedExtentOfForest = Numbers.eq(Numbers.sum([forestPercent, otherWoodedLandPercent]), 100)

  // if forestPlantationPercent is 0, set forestPlantationIntroducedPercent to 0
  let _forestPlantationIntroducedPercent = forestPlantationIntroducedPercent

  if (Numbers.eq(forestPlantationPercent, 0)) {
    _forestPlantationIntroducedPercent = '0'
  }

  // if forestNaturalPercent is 0, set forestPlantationIntroducedPercent to 0
  let _forestNaturalForestOfWhichPrimaryForestPercent = forestNaturalForestOfWhichPrimaryForestPercent

  if (Numbers.eq(forestNaturalPercent, 0)) {
    _forestNaturalForestOfWhichPrimaryForestPercent = '0'
  }

  // if previous value for naturally regenerating forest was 0, and now > 0 set primary forest to null
  if (
    field === 'forestNaturalPercent' &&
    Numbers.eq(Numbers.toBigNumber(prevValue), 0) &&
    Numbers.greaterThan(forestNaturalPercent, 0)
  ) {
    _forestNaturalForestOfWhichPrimaryForestPercent = null
  }

  // if previous value for forestPlantationPercent was 0, and now > 0 set forestPlantationIntroducedPercent to null
  if (
    field === 'forestPlantationPercent' &&
    Numbers.eq(Numbers.toBigNumber(prevValue), 0) &&
    Numbers.greaterThan(forestPlantationPercent, 0)
  ) {
    _forestPlantationIntroducedPercent = null
  }

  return {
    ...nationalClass,
    forestNaturalPercent: getValueOrNull(forestNaturalPercent, rowIsMaxedForestCharacteristics),
    forestPlantationPercent: getValueOrNull(forestPlantationPercent, rowIsMaxedForestCharacteristics),
    otherPlantedForestPercent: getValueOrNull(otherPlantedForestPercent, rowIsMaxedForestCharacteristics),
    forestPercent: getValueOrNull(forestPercent, rowIsMaxedExtentOfForest),
    otherWoodedLandPercent: getValueOrNull(otherWoodedLandPercent, rowIsMaxedExtentOfForest),
    forestPlantationIntroducedPercent: _forestPlantationIntroducedPercent,
    forestNaturalForestOfWhichPrimaryForestPercent: _forestNaturalForestOfWhichPrimaryForestPercent,
  }
}

export const updateNationalClass = (props: {
  odp: OriginalDataPoint
  index: number
  field: keyof ODPNationalClass
  value: string
}): OriginalDataPoint => {
  const { odp: odpProps, index, field, value } = props

  const odp: OriginalDataPoint = Objects.cloneDeep(odpProps)
  const calculateProps = { odp, index, field, value }
  const nationalClass: ODPNationalClass = calculateValues(calculateProps)

  const wasPlaceHolder = !Objects.isNil(nationalClass.placeHolder)
  delete nationalClass.placeHolder

  odp.nationalClasses[index] = nationalClass
  if (wasPlaceHolder) {
    odp.nationalClasses.push(ODPNationalClassFactory.newNationalClassPlaceholder())
  }

  return calculateODPValues(odp)
}

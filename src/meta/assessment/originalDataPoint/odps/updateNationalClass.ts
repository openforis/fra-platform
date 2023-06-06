import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ODPNationalClass, ODPNationalClassFactory } from '../odpNationalClass'
import { OriginalDataPoint } from '../originalDataPoint'

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

const calculateValues = (nationalClass: ODPNationalClass) => {
  const {
    forestNaturalPercent,
    forestPlantationPercent,
    otherPlantedForestPercent,
    forestPercent,
    otherWoodedLandPercent,
    forestPlantationIntroducedPercent,
  } = nationalClass

  const rowIsMaxedForestCharacteristics = Numbers.eq(
    Numbers.sum([forestNaturalPercent, forestPlantationPercent, otherPlantedForestPercent]),
    100
  )

  const rowIsMaxedExtentOfForest = Numbers.eq(Numbers.sum([forestPercent, otherWoodedLandPercent]), 100)

  return {
    ...nationalClass,
    forestNaturalPercent: getValueOrNull(forestNaturalPercent, rowIsMaxedForestCharacteristics),
    forestPlantationPercent: getValueOrNull(forestPlantationPercent, rowIsMaxedForestCharacteristics),
    otherPlantedForestPercent: getValueOrNull(otherPlantedForestPercent, rowIsMaxedForestCharacteristics),
    forestPercent: getValueOrNull(forestPercent, rowIsMaxedExtentOfForest),
    otherWoodedLandPercent: getValueOrNull(otherWoodedLandPercent, rowIsMaxedExtentOfForest),
    forestPlantationIntroducedPercent,
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
  const nationalClass: ODPNationalClass = calculateValues({ ...odp.nationalClasses[index], [field]: value })

  const wasPlaceHolder = !Objects.isNil(nationalClass.placeHolder)
  delete nationalClass.placeHolder

  odp.nationalClasses[index] = nationalClass
  if (wasPlaceHolder) {
    odp.nationalClasses.push(ODPNationalClassFactory.newNationalClassPlaceholder())
  }

  return odp
}

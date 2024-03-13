import { Numbers } from 'utils/numbers'

import { ODPs, OriginalDataPoint } from 'meta/assessment'

const { toString } = Numbers

const calculateValues = (originalDataPoint: OriginalDataPoint) => {
  // eslint-disable-next-line no-param-reassign
  if (!originalDataPoint.values) originalDataPoint = { ...originalDataPoint, values: {} }

  const forestArea = toString(ODPs.calcTotalFieldArea({ originalDataPoint, field: 'forestPercent' }))
  const otherWoodedLand = toString(ODPs.calcTotalFieldArea({ originalDataPoint, field: 'otherWoodedLandPercent' }))

  const naturalForestArea = toString(
    ODPs.calcTotalSubFieldArea({ originalDataPoint, field: 'forestPercent', subField: 'forestNaturalPercent' })
  )

  const primaryForest = toString(
    ODPs.calcTotalSubSubFieldArea({
      originalDataPoint,
      field: 'forestPercent',
      subField: 'forestNaturalPercent',
      subSubField: 'forestNaturalForestOfWhichPrimaryForestPercent',
    })
  )
  const plantationForestArea = toString(
    ODPs.calcTotalSubFieldArea({
      originalDataPoint,
      field: 'forestPercent',
      subField: 'forestPlantationPercent',
    })
  )
  const plantationForestIntroducedArea = toString(
    ODPs.calcTotalSubSubFieldArea({
      originalDataPoint,
      field: 'forestPercent',
      subField: 'forestPlantationPercent',
      subSubField: 'forestPlantationIntroducedPercent',
    })
  )
  const otherPlantedForestArea = toString(
    ODPs.calcTotalSubFieldArea({
      originalDataPoint,
      field: 'forestPercent',
      subField: 'otherPlantedForestPercent',
    })
  )

  const primaryForestPercent = toString(ODPs.calcPrimaryForestPercent({ originalDataPoint }))

  return {
    ...originalDataPoint,
    values: {
      forestArea,
      otherWoodedLand,

      naturalForestArea,
      primaryForest,
      primaryForestPercent,
      plantationForestArea,
      plantationForestIntroducedArea,
      otherPlantedForestArea,
    },
  }
}

export const OriginalDataPointValues = {
  calculateValues,
}

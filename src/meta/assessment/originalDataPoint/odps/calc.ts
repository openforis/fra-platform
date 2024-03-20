import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { hasNaturallyRegenerating } from 'meta/assessment/originalDataPoint/odps/nationalClassUtils'

import { ODPNationalClass } from '../odpNationalClass'
import { OriginalDataPoint } from '../originalDataPoint'

export const calcTotalArea = (props: { originalDataPoint: OriginalDataPoint }): string | null => {
  const { originalDataPoint } = props
  const areas = originalDataPoint.nationalClasses
    .map((nationalClass) => nationalClass.area)
    .filter((area) => !Objects.isNil(area))
  return Numbers.sum(areas)
}

export const calcTotalFieldArea = (props: {
  originalDataPoint: OriginalDataPoint
  field: keyof ODPNationalClass
}): number => {
  const { originalDataPoint, field } = props
  const nationalClasses = originalDataPoint.nationalClasses.filter(
    (nationalClass) => !Objects.isNil(nationalClass.area) && !Objects.isNil(nationalClass[field])
  )
  const values = nationalClasses.map((nationalClass) =>
    Numbers.mul(nationalClass.area, nationalClass[field] as string).div(100.0)
  )
  return Numbers.sum(values)
}

export const calcTotalSubFieldArea = (props: {
  originalDataPoint: OriginalDataPoint
  field: keyof ODPNationalClass
  subField: keyof ODPNationalClass
}): number => {
  const { originalDataPoint, field, subField } = props
  const nationalClasses = originalDataPoint.nationalClasses.filter(
    (nationalClass) =>
      !Objects.isNil(nationalClass.area) &&
      !Objects.isNil(nationalClass[field]) &&
      !Objects.isNil(nationalClass[subField])
  )
  const values = nationalClasses.map((nationalClass) => {
    const x = Numbers.mul(nationalClass.area, nationalClass[field] as string)
    const y = Numbers.mul(x, nationalClass[subField] as string)
    return Numbers.div(y, 10000.0)
  })

  return Numbers.sum(values)
}

export const calcTotalSubSubFieldArea = (props: {
  originalDataPoint: OriginalDataPoint
  field: keyof ODPNationalClass
  subField: keyof ODPNationalClass
  subSubField: keyof ODPNationalClass
}): number => {
  const { originalDataPoint, field, subField, subSubField } = props

  const nationalClasses = originalDataPoint.nationalClasses.filter(
    (nationalClass) =>
      !Objects.isNil(nationalClass.area) &&
      !Objects.isNil(nationalClass[field]) &&
      !Objects.isNil(nationalClass[subField])
  )

  // get all national classes with parent value for this subsub field
  const withParentValue = nationalClasses.filter((nationalClass) => {
    return Numbers.greaterThan(nationalClass[subField] as string, 0)
  })

  // if we have one or more parent value and any subsub value is null, return null
  if (
    withParentValue.length > 0 &&
    withParentValue.every((nationalClass) => Objects.isNil(nationalClass[subSubField]))
  ) {
    return null
  }

  const values = nationalClasses.map((nationalClass) => {
    const x = Numbers.mul(nationalClass.area, nationalClass[field] as string)
    const y = Numbers.mul(x, nationalClass[subField] as string)
    const z = Numbers.mul(y, nationalClass[subSubField] as string)
    return Numbers.div(z, 1000000.0)
  })
  return Numbers.sum(values)
}

// Returns true if we should calculate using the total primary forest percentage: values.primaryForestPercent
export const shouldUseTotalPrimaryForestPercentage = (props: { originalDataPoint: OriginalDataPoint }): boolean => {
  const { originalDataPoint } = props
  const primaryForestPercentages = originalDataPoint.nationalClasses
    .filter(hasNaturallyRegenerating)
    .map((nationalClass) => nationalClass.forestNaturalForestOfWhichPrimaryForestPercent)

  return primaryForestPercentages.every(Objects.isEmpty)
}

const calculatePrimaryForest = (props: { originalDataPoint: OriginalDataPoint }): number | undefined => {
  const { originalDataPoint } = props
  const useTotal = shouldUseTotalPrimaryForestPercentage({ originalDataPoint })

  if (useTotal) {
    if (Objects.isEmpty(originalDataPoint.values.primaryForestPercent)) {
      return undefined
    }

    const naturalForest = calcTotalSubFieldArea({
      originalDataPoint,
      field: 'forestPercent',
      subField: 'forestNaturalPercent',
    })
    const primaryForestPercent = Numbers.toBigNumber(originalDataPoint.values.primaryForestPercent)

    return Numbers.mul(naturalForest, Numbers.div(primaryForestPercent, 100)).toNumber()
  }

  return calcTotalSubSubFieldArea({
    originalDataPoint,
    field: 'forestPercent',
    subField: 'forestNaturalPercent',
    subSubField: 'forestNaturalForestOfWhichPrimaryForestPercent',
  })
}

export const calcPrimaryForestTotalPercent = (props: { originalDataPoint: OriginalDataPoint }): number | undefined => {
  const { originalDataPoint } = props

  const useTotal = shouldUseTotalPrimaryForestPercentage({ originalDataPoint })

  if (useTotal) {
    return Objects.isEmpty(originalDataPoint.values.primaryForestPercent)
      ? undefined
      : Number(originalDataPoint.values.primaryForestPercent)
  }

  const subField = 'forestNaturalPercent'
  const field = 'forestPercent'
  const naturalForest = calcTotalSubFieldArea({ originalDataPoint, field, subField })
  const primaryForest = calculatePrimaryForest({ originalDataPoint })
  return (primaryForest / naturalForest) * 100
}

export const calcTotalLandArea = (props: { originalDataPoint: OriginalDataPoint }): number => {
  const { originalDataPoint } = props
  const totalArea = calcTotalArea({ originalDataPoint })
  const forestArea = calcTotalFieldArea({ originalDataPoint, field: 'forestPercent' })
  const otherWoodedArea = calcTotalFieldArea({ originalDataPoint, field: 'otherWoodedLandPercent' })
  return Numbers.sub(totalArea, Numbers.add(forestArea, otherWoodedArea))?.toNumber()
}

export const calculateValues = (originalDataPoint: OriginalDataPoint) => {
  const forestArea = Numbers.toString(calcTotalFieldArea({ originalDataPoint, field: 'forestPercent' }))
  const otherWoodedLand = Numbers.toString(calcTotalFieldArea({ originalDataPoint, field: 'otherWoodedLandPercent' }))

  const naturalForestArea = Numbers.toString(
    calcTotalSubFieldArea({ originalDataPoint, field: 'forestPercent', subField: 'forestNaturalPercent' })
  )

  const primaryForest = Numbers.toString(calculatePrimaryForest({ originalDataPoint }))
  const primaryForestPercent = Numbers.toString(calcPrimaryForestTotalPercent({ originalDataPoint }))

  const plantationForestArea = Numbers.toString(
    calcTotalSubFieldArea({
      originalDataPoint,
      field: 'forestPercent',
      subField: 'forestPlantationPercent',
    })
  )
  const plantationForestIntroducedArea = Numbers.toString(
    calcTotalSubSubFieldArea({
      originalDataPoint,
      field: 'forestPercent',
      subField: 'forestPlantationPercent',
      subSubField: 'forestPlantationIntroducedPercent',
    })
  )
  const otherPlantedForestArea = Numbers.toString(
    calcTotalSubFieldArea({
      originalDataPoint,
      field: 'forestPercent',
      subField: 'otherPlantedForestPercent',
    })
  )

  let plantedForest = null
  if (!Objects.isEmpty(plantationForestArea) && !Objects.isEmpty(otherPlantedForestArea)) {
    plantedForest = Numbers.toString(Numbers.add(plantationForestArea ?? '0', otherPlantedForestArea ?? '0'))
  }

  let total = null
  if (
    !Objects.isEmpty(naturalForestArea) ||
    !Objects.isEmpty(plantationForestArea) ||
    !Objects.isEmpty(otherPlantedForestArea)
  ) {
    total = Numbers.toString(
      Numbers.sum([naturalForestArea ?? '0', plantationForestArea ?? '0', otherPlantedForestArea ?? '0'])
    )
  }

  let totalForestArea = null
  if (!Objects.isEmpty(plantedForest) || !Objects.isEmpty(naturalForestArea)) {
    totalForestArea = Numbers.toString(Numbers.sum([plantedForest ?? '0', naturalForestArea ?? '0']))
  }

  return {
    ...originalDataPoint,
    values: {
      forestArea,
      naturalForestArea,
      otherPlantedForestArea,
      otherWoodedLand,
      plantationForestArea,
      plantationForestIntroducedArea,
      plantedForest,
      primaryForest,
      primaryForestPercent,
      total,
      totalForestArea,
    },
  }
}

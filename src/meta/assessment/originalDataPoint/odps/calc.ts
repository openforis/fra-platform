import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

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

const shouldUseTotal = (props: { originalDataPoint: OriginalDataPoint }): boolean => {
  const { originalDataPoint } = props
  const primaryForestPercentages = originalDataPoint.nationalClasses.map(
    (nationalClass) => nationalClass.forestNaturalForestOfWhichPrimaryForestPercent
  )

  return (
    primaryForestPercentages.every(Objects.isEmpty) && !Objects.isEmpty(originalDataPoint.values.primaryForestPercent)
  )
}
const calculatePrimaryForest = (props: { originalDataPoint: OriginalDataPoint }): number | null => {
  const { originalDataPoint } = props

  const useTotal = shouldUseTotal({ originalDataPoint })
  if (useTotal)
    return (
      (calcTotalFieldArea({ originalDataPoint, field: 'forestPercent' }) *
        Number(originalDataPoint.values.primaryForestPercent)) /
      100
    )

  return calcTotalSubSubFieldArea({
    originalDataPoint,
    field: 'forestPercent',
    subField: 'forestNaturalPercent',
    subSubField: 'forestNaturalForestOfWhichPrimaryForestPercent',
  })
}

export const calcPrimaryForestTotalPercent = (props: { originalDataPoint: OriginalDataPoint }): number | undefined => {
  const { originalDataPoint } = props

  const useTotal = shouldUseTotal({ originalDataPoint })
  if (useTotal) return Number(originalDataPoint.values.primaryForestPercent) ?? undefined

  return (
    (calculatePrimaryForest({ originalDataPoint }) /
      calcTotalFieldArea({ originalDataPoint, field: 'forestPercent' })) *
    100
  )
}

export const calcTotalLandArea = (props: { originalDataPoint: OriginalDataPoint }): number => {
  const { originalDataPoint } = props
  const totalArea = calcTotalArea({ originalDataPoint })
  const forestArea = calcTotalFieldArea({ originalDataPoint, field: 'forestPercent' })
  const otherWoodedArea = calcTotalFieldArea({ originalDataPoint, field: 'otherWoodedLandPercent' })
  return Numbers.sub(totalArea, Numbers.add(forestArea, otherWoodedArea))?.toNumber()
}

export const calculateValues = (originalDataPoint: OriginalDataPoint) => {
  const { toString } = Numbers

  // eslint-disable-next-line no-param-reassign
  if (!originalDataPoint.values) originalDataPoint = { ...originalDataPoint, values: {} }

  const forestArea = toString(calcTotalFieldArea({ originalDataPoint, field: 'forestPercent' }))
  const otherWoodedLand = toString(calcTotalFieldArea({ originalDataPoint, field: 'otherWoodedLandPercent' }))

  const naturalForestArea = toString(
    calcTotalSubFieldArea({ originalDataPoint, field: 'forestPercent', subField: 'forestNaturalPercent' })
  )

  const primaryForest = toString(calculatePrimaryForest({ originalDataPoint }))
  const plantationForestArea = toString(
    calcTotalSubFieldArea({
      originalDataPoint,
      field: 'forestPercent',
      subField: 'forestPlantationPercent',
    })
  )
  const plantationForestIntroducedArea = toString(
    calcTotalSubSubFieldArea({
      originalDataPoint,
      field: 'forestPercent',
      subField: 'forestPlantationPercent',
      subSubField: 'forestPlantationIntroducedPercent',
    })
  )
  const otherPlantedForestArea = toString(
    calcTotalSubFieldArea({
      originalDataPoint,
      field: 'forestPercent',
      subField: 'otherPlantedForestPercent',
    })
  )

  const primaryForestPercent = toString(calcPrimaryForestTotalPercent({ originalDataPoint }))

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

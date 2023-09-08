import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ODPNationalClass } from '../odpNationalClass'
import { OriginalDataPoint } from '../originalDataPoint'

export const calcTotalArea = (props: { originalDataPoint: OriginalDataPoint }): number => {
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

  const someIsNull = originalDataPoint.nationalClasses.some(
    (nationalClass) =>
      !nationalClass.placeHolder &&
      (Objects.isNil(nationalClass.area) ||
        Objects.isNil(nationalClass[field]) ||
        Objects.isNil(nationalClass[subField]) ||
        Objects.isNil(nationalClass[subSubField]))
  )

  // When calculating sub sub field area, require that _all_ fields are not null

  if (someIsNull) {
    return null
  }

  const nationalClasses = originalDataPoint.nationalClasses.filter(
    (nationalClass) =>
      !Objects.isNil(nationalClass.area) &&
      !Objects.isNil(nationalClass[field]) &&
      !Objects.isNil(nationalClass[subField]) &&
      !Objects.isNil(nationalClass[subSubField])
  )

  const values = nationalClasses.map((nationalClass) => {
    const x = Numbers.mul(nationalClass.area, nationalClass[field] as string)
    const y = Numbers.mul(x, nationalClass[subField] as string)
    const z = Numbers.mul(y, nationalClass[subSubField] as string)
    return Numbers.div(z, 1000000.0)
  })
  return Numbers.sum(values)
}

export const calcTotalLandArea = (props: { originalDataPoint: OriginalDataPoint }): number => {
  const { originalDataPoint } = props
  const totalArea = calcTotalArea({ originalDataPoint })
  const forestArea = calcTotalFieldArea({ originalDataPoint, field: 'forestPercent' })
  const otherWoodedArea = calcTotalFieldArea({ originalDataPoint, field: 'otherWoodedLandPercent' })
  return Numbers.sub(totalArea, Numbers.add(forestArea, otherWoodedArea))?.toNumber()
}

import { Numbers } from '@core/utils/numbers'
import { Objects } from '@core/utils'

import { ODP } from '../odp'
import { ODPNationalClass } from '../odpNationalClass'

export const calcTotalArea = (props: { odp: ODP }): number => {
  const { odp } = props
  const areas = odp.nationalClasses.map((nationalClass) => nationalClass.area).filter((area) => !Objects.isNil(area))
  return Numbers.sum(areas)
}

export const calcTotalFieldArea = (props: { odp: ODP; field: keyof ODPNationalClass }): number => {
  const { odp, field } = props
  const nationalClasses = odp.nationalClasses.filter(
    (nationalClass) => !Objects.isNil(nationalClass.area) && !Objects.isNil(nationalClass[field])
  )
  const values = nationalClasses.map((nationalClass) =>
    Numbers.mul(nationalClass.area, nationalClass[field] as string).div(100.0)
  )
  return Numbers.sum(values)
}

export const calcTotalSubFieldArea = (props: {
  odp: ODP
  field: keyof ODPNationalClass
  subField: keyof ODPNationalClass
}): number => {
  const { odp, field, subField } = props
  const nationalClasses = odp.nationalClasses.filter(
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
  odp: ODP
  field: keyof ODPNationalClass
  subField: keyof ODPNationalClass
  subSubField: keyof ODPNationalClass
}): number => {
  const { odp, field, subField, subSubField } = props
  const nationalClasses = odp.nationalClasses.filter(
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

export const calcTotalLandArea = (props: { odp: ODP }): number => {
  const { odp } = props
  const totalArea = calcTotalArea({ odp })
  const forestArea = calcTotalFieldArea({ odp, field: 'forestPercent' })
  const otherWoodedArea = calcTotalFieldArea({ odp, field: 'otherWoodedLandPercent' })
  return Numbers.sub(totalArea, Numbers.add(forestArea, otherWoodedArea))?.toNumber()
}

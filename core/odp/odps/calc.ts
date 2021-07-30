import { add, mul, sub, sum } from '@common/bignumberUtils'
import { Objects } from '@core/utils'

import { ODP } from '../odp'
import { ODPNationalClass } from '../odpNationalClass'

export const calcTotalArea = (props: { odp: ODP }): number => {
  const { odp } = props
  const areas = odp.nationalClasses.map((nationalClass) => nationalClass.area).filter((area) => !Objects.isNil(area))
  return sum(areas)
}

export const calcTotalFieldArea = (props: { odp: ODP; field: keyof ODPNationalClass }): number => {
  const { odp, field } = props
  const nationalClasses = odp.nationalClasses.filter(
    (nationalClass) => !Objects.isNil(nationalClass.area) && !Objects.isNil(nationalClass[field])
  )
  const values = nationalClasses.map((nationalClass) =>
    mul(nationalClass.area, nationalClass[field] as string).div(100.0)
  )
  return sum(values)
}

export const calcTotalLandArea = (props: { odp: ODP }): number => {
  const { odp } = props
  const totalArea = calcTotalArea({ odp })
  const forestArea = calcTotalFieldArea({ odp, field: 'forestPercent' })
  const otherWoodedArea = calcTotalFieldArea({ odp, field: 'otherWoodedLandPercent' })
  return sub(totalArea, add(forestArea, otherWoodedArea)).toNumber()
}

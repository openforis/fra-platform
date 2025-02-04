import { useMemo } from 'react'

import { Numbers } from 'utils/numbers'

import { ODPs, OriginalDataPoint } from 'meta/assessment'

type Props = {
  originalDataPoint: OriginalDataPoint
}

type Returned = {
  totalArea: string
  totalForestPercent: string
  totalLandArea: string
  totalOtherWoodedLandPercent: string
}

export const useCalculatedValues = (props: Props): Returned => {
  const { originalDataPoint } = props

  return useMemo<Returned>(() => {
    const totalArea = Numbers.format(ODPs.calcTotalArea({ originalDataPoint }))
    const totalForestPercent = Numbers.format(originalDataPoint.values.totalForestArea)
    const totalLandArea = Numbers.format(ODPs.calcTotalLandArea({ originalDataPoint }))
    const totalOtherWoodedLandPercent = Numbers.format(originalDataPoint.values.otherWoodedLand)
    return { totalArea, totalForestPercent, totalLandArea, totalOtherWoodedLandPercent }
  }, [originalDataPoint])
}

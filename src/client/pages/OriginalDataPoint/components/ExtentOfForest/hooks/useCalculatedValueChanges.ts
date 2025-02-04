import { useMemo } from 'react'

import * as Diff from 'diff'
import { Change } from 'diff'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ODPs } from 'meta/assessment'

import { useHistoryLastApprovedIsActive } from 'client/store/data'
import { useLastApprovedOriginalDataPoint } from 'client/store/data/hooks/useLastApprovedOriginalDataPoint'

type Props = {
  totalArea: string
  totalForestPercent: string
  totalLandArea: string
  totalOtherWoodedLandPercent: string
}

type Returned = {
  totalArea: Array<Change>
  totalForestPercent: Array<Change>
  totalLandArea: Array<Change>
  totalOtherWoodedLandPercent: Array<Change>
}

export const useCalculatedValueChanges = (props: Props): Returned => {
  const {
    totalArea: totalAreaCurrent,
    totalForestPercent: totalForestPercentCurrent,
    totalLandArea: totalLandAreaCurrent,
    totalOtherWoodedLandPercent: totalOtherWoodedLandPercentCurrent,
  } = props

  const originalDataPointHistory = useLastApprovedOriginalDataPoint()
  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()

  return useMemo<Returned>(() => {
    if (!historyLastApprovedIsActive) {
      return {
        totalArea: [],
        totalForestPercent: [],
        totalLandArea: [],
        totalOtherWoodedLandPercent: [],
      }
    }

    const canCalculate = !Objects.isEmpty(originalDataPointHistory)

    const totalAreaPrev = canCalculate
      ? Numbers.format(ODPs.calcTotalArea({ originalDataPoint: originalDataPointHistory }))
      : ''
    const totalArea = Diff.diffChars(totalAreaPrev, totalAreaCurrent ?? '')

    const totalForestPercentPrev = canCalculate ? Numbers.format(originalDataPointHistory.values.totalForestArea) : ''
    const totalForestPercent = Diff.diffChars(totalForestPercentPrev, totalForestPercentCurrent ?? '')

    const totalLandAreaPrev = canCalculate
      ? Numbers.format(ODPs.calcTotalLandArea({ originalDataPoint: originalDataPointHistory }))
      : ''
    const totalLandArea = Diff.diffChars(totalLandAreaPrev, totalLandAreaCurrent ?? '')

    const totalOtherWoodedLandPercentPrev = canCalculate
      ? `${Numbers.format(originalDataPointHistory.values.otherWoodedLand)} %`
      : ''

    const totalOtherWoodedLandPercent = Diff.diffChars(
      totalOtherWoodedLandPercentPrev,
      totalOtherWoodedLandPercentCurrent ?? ''
    )

    return { totalArea, totalForestPercent, totalLandArea, totalOtherWoodedLandPercent }
  }, [
    historyLastApprovedIsActive,
    originalDataPointHistory,
    totalAreaCurrent,
    totalForestPercentCurrent,
    totalLandAreaCurrent,
    totalOtherWoodedLandPercentCurrent,
  ])
}

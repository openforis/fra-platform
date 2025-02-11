import { useMemo } from 'react'

import * as Diff from 'diff'
import { Change } from 'diff'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ODPs } from 'meta/assessment'

import { useHistoryLastApprovedIsActive } from 'client/store/data'
import { useLastApprovedOriginalDataPoint } from 'client/store/data/hooks/useLastApprovedOriginalDataPoint'

type Props = {
  totalForestNaturalPercentArea: string | null
  totalPrimaryForestNaturalPercentArea: string | null
}

type Returned = {
  forestNaturalPercentArea: Array<Change>
  primaryForestNaturalPercentArea: Array<Change>
}

export const useNaturalForestPercentAndAreaTotalsChange = (props: Props): Returned => {
  const {
    totalForestNaturalPercentArea: totalForestNaturalPercentAreaCurrent,
    totalPrimaryForestNaturalPercentArea: totalPrimaryForestNaturalPercentAreaCurrent,
  } = props

  const originalDataPointHistory = useLastApprovedOriginalDataPoint()
  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()

  return useMemo<Returned>(() => {
    if (!historyLastApprovedIsActive) return undefined

    const canCalculate = !Objects.isEmpty(originalDataPointHistory)

    const totalForestNaturalPercentAreaPrev = canCalculate
      ? Numbers.format(
          ODPs.calcTotalSubFieldArea({
            originalDataPoint: originalDataPointHistory,
            field: 'forestPercent',
            subField: 'forestNaturalPercent',
          })
        )
      : null

    const forestNaturalPercentArea = Diff.diffLines(
      totalForestNaturalPercentAreaPrev ?? '',
      totalForestNaturalPercentAreaCurrent ?? ''
    )

    const totalPrimaryForestNaturalPercentAreaPrev =
      canCalculate && originalDataPointHistory.values.primaryForest
        ? Numbers.format(Numbers.toBigNumber(originalDataPointHistory.values.primaryForest))
        : null

    const primaryForestNaturalPercentArea = Diff.diffLines(
      totalPrimaryForestNaturalPercentAreaPrev ?? '',
      totalPrimaryForestNaturalPercentAreaCurrent ?? ''
    )

    return {
      forestNaturalPercentArea,
      primaryForestNaturalPercentArea,
    }
  }, [
    historyLastApprovedIsActive,
    originalDataPointHistory,
    totalForestNaturalPercentAreaCurrent,
    totalPrimaryForestNaturalPercentAreaCurrent,
  ])
}

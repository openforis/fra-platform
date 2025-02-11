import { useMemo } from 'react'

import * as Diff from 'diff'
import { Change } from 'diff'
import { Numbers } from 'utils/numbers'

import { useHistoryLastApprovedIsActive } from 'client/store/data'
import { useLastApprovedOriginalDataPoint } from 'client/store/data/hooks/useLastApprovedOriginalDataPoint'

type Props = {
  primaryForestPercent?: string
}

type Returned = Array<Change>

export const usePrimaryForestPercentChange = (props: Props): Returned => {
  const { primaryForestPercent: primaryForestPercentCurrent } = props

  const originalDataPointHistory = useLastApprovedOriginalDataPoint()
  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()

  return useMemo<Returned>(() => {
    if (!historyLastApprovedIsActive) return undefined

    const formattedPrimaryForestTotalPercentPrev = Numbers.toFixed(
      originalDataPointHistory?.values?.primaryForestPercent ?? '',
      3
    )
    const formattedPrimaryForestPercentCurrent = Numbers.toFixed(primaryForestPercentCurrent ?? '', 3)
    return Diff.diffLines(formattedPrimaryForestTotalPercentPrev ?? '', formattedPrimaryForestPercentCurrent ?? '')
  }, [historyLastApprovedIsActive, originalDataPointHistory, primaryForestPercentCurrent])
}

import { useMemo } from 'react'

import * as Diff from 'diff'
import { Change } from 'diff'
import { Numbers } from 'utils/numbers'

import { useLastApprovedOriginalDataPoint } from 'client/store/data/history/hooks/lastApprovedOriginalDataPoint'
import { useODPDisplayHistory } from 'client/pages/OriginalDataPoint/components/hooks/useODPDisplayHistory'

type Props = {
  primaryForestPercent?: string
}

type Returned = Array<Change>

export const usePrimaryForestPercentChange = (props: Props): Returned => {
  const { primaryForestPercent: primaryForestPercentCurrent } = props

  const originalDataPointHistory = useLastApprovedOriginalDataPoint()
  const displayHistory = useODPDisplayHistory()

  return useMemo<Returned>(() => {
    if (!displayHistory) return undefined

    const formattedPrimaryForestTotalPercentPrev = Numbers.toFixed(
      originalDataPointHistory?.values?.primaryForestPercent ?? '',
      3
    )
    const formattedPrimaryForestPercentCurrent = Numbers.toFixed(primaryForestPercentCurrent ?? '', 3)
    return Diff.diffLines(formattedPrimaryForestTotalPercentPrev ?? '', formattedPrimaryForestPercentCurrent ?? '')
  }, [displayHistory, originalDataPointHistory, primaryForestPercentCurrent])
}

import { useMemo } from 'react'

import * as Diff from 'diff'
import { Change } from 'diff'
import { Objects } from 'utils/objects'

import { ODPs } from 'meta/assessment/odps'

import { useLastApprovedOriginalDataPoint } from 'client/store/data/history/hooks/lastApprovedOriginalDataPoint'
import { useODPDisplayHistory } from 'client/pages/OriginalDataPoint/components/hooks/useODPDisplayHistory'

type Props = {
  nationalClassIndex: number
  otherLandPercent: string | null
}

type Returned = Array<Change>

export const useOtherLandPercentChange = (props: Props): Returned => {
  const { nationalClassIndex, otherLandPercent: otherLandPercentCurrent } = props

  const originalDataPointHistory = useLastApprovedOriginalDataPoint()
  const displayHistory = useODPDisplayHistory()
  const nationalClass = originalDataPointHistory?.nationalClasses?.[nationalClassIndex]

  return useMemo<Returned>(() => {
    if (!displayHistory) return undefined

    const canCalculate = !Objects.isEmpty(nationalClass)

    const otherLandPercentPrev = canCalculate ? ODPs.calculateNationalClassOtherLandPercent(nationalClass) : null

    return Diff.diffLines(otherLandPercentPrev ?? '', otherLandPercentCurrent ?? '')
  }, [displayHistory, nationalClass, otherLandPercentCurrent])
}

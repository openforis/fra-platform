import { useMemo } from 'react'

import * as Diff from 'diff'
import { Change } from 'diff'
import { Objects } from 'utils/objects'

import { ODPs } from 'meta/assessment'

import { useHistoryLastApprovedIsActive } from 'client/store/data'
import { useLastApprovedOriginalDataPoint } from 'client/store/data/hooks/useLastApprovedOriginalDataPoint'

type Props = {
  nationalClassIndex: number
  otherLandPercent: string | null
}

type Returned = Array<Change>

export const useOtherLandPercentChange = (props: Props): Returned => {
  const { nationalClassIndex, otherLandPercent } = props

  const originalDataPointHistory = useLastApprovedOriginalDataPoint()
  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()
  const nationalClass = originalDataPointHistory?.nationalClasses?.[nationalClassIndex]

  return useMemo<Returned>(() => {
    if (!historyLastApprovedIsActive) return undefined

    const canCalculate = !Objects.isEmpty(nationalClass)

    const otherLandPercentCurrent = !Objects.isNil(otherLandPercent) ? `${otherLandPercent} %` : ''

    const otherLandPercentPrevValue = canCalculate ? ODPs.calculateNationalClassOtherLandPercent(nationalClass) : null
    const otherLandPercentPrev = !Objects.isNil(otherLandPercentPrevValue) ? `${otherLandPercentPrevValue} %` : ''

    return Diff.diffChars(otherLandPercentPrev, otherLandPercentCurrent)
  }, [historyLastApprovedIsActive, nationalClass, otherLandPercent])
}

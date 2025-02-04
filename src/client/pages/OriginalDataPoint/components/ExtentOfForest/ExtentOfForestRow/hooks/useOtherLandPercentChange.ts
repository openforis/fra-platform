import { useMemo } from 'react'

import * as Diff from 'diff'
import { Change } from 'diff'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ODPs } from 'meta/assessment'

import { useHistoryLastApprovedIsActive } from 'client/store/data'
import { useLastApprovedOriginalDataPoint } from 'client/store/data/hooks/useLastApprovedOriginalDataPoint'

type Props = {
  nationalClassIndex: number
  otherLandPercent: string
}

type Returned = Array<Change>

export const useOtherLandPercentChange = (props: Props): Returned => {
  const { nationalClassIndex, otherLandPercent: otherLandPercentCurrent } = props

  const originalDataPointHistory = useLastApprovedOriginalDataPoint()
  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()
  const nationalClass = originalDataPointHistory?.nationalClasses?.[nationalClassIndex]

  return useMemo<Returned>(() => {
    if (!historyLastApprovedIsActive) return undefined

    const canCalculate = !Objects.isEmpty(nationalClass)

    const otherLandPercentPrev = canCalculate
      ? `${Numbers.format(ODPs.calculateNationalClassOtherLandPercent(nationalClass), 3)} %`
      : ''
    return Diff.diffChars(otherLandPercentPrev, `${otherLandPercentCurrent} %`)
  }, [historyLastApprovedIsActive, nationalClass, otherLandPercentCurrent])
}

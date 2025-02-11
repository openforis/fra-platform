import { useMemo } from 'react'

import * as Diff from 'diff'
import { Change } from 'diff'
import { Objects } from 'utils/objects'

import { ODPs } from 'meta/assessment'

import { useHistoryLastApprovedIsActive } from 'client/store/data'
import { useLastApprovedOriginalDataPoint } from 'client/store/data/hooks/useLastApprovedOriginalDataPoint'

type Props = {
  nationalClassForestArea: string | null
  nationalClassIndex: number
}

type Returned = Array<Change>

export const useNationalClassForestAreaChange = (props: Props): Returned => {
  const { nationalClassForestArea: nationalClassForestAreaCurrent, nationalClassIndex } = props

  const originalDataPointHistory = useLastApprovedOriginalDataPoint()
  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()
  const nationalClass = originalDataPointHistory?.nationalClasses?.[nationalClassIndex]

  return useMemo<Returned>(() => {
    if (!historyLastApprovedIsActive) return undefined

    const canCalculate = !Objects.isEmpty(nationalClass)

    const nationalClassForestAreaPrev = canCalculate ? ODPs.calculateNationalClassForestArea(nationalClass) : null

    return Diff.diffLines(
      nationalClassForestAreaPrev?.toString() ?? '',
      nationalClassForestAreaCurrent?.toString() ?? ''
    )
  }, [historyLastApprovedIsActive, nationalClass, nationalClassForestAreaCurrent])
}

import { useMemo } from 'react'

import BigNumber from 'bignumber.js'
import * as Diff from 'diff'
import { Change } from 'diff'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ODPs } from 'meta/assessment'

import { useHistoryLastApprovedIsActive } from 'client/store/data'
import { useLastApprovedOriginalDataPoint } from 'client/store/data/hooks/useLastApprovedOriginalDataPoint'

type Props = {
  nationalClassIndex: number
  naturalForestPercentArea: BigNumber | null
}

type Returned = Array<Change>

export const useNaturalForestPercentAndAreaChange = (props: Props): Returned => {
  const { nationalClassIndex, naturalForestPercentArea: naturalForestPercentAreaCurrent } = props

  const originalDataPointHistory = useLastApprovedOriginalDataPoint()
  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()
  const nationalClass = originalDataPointHistory?.nationalClasses?.[nationalClassIndex]

  return useMemo<Returned>(() => {
    if (!historyLastApprovedIsActive) return undefined

    const canCalculate = !Objects.isEmpty(nationalClass)

    const naturalForestPercentAreaPrev = canCalculate
      ? ODPs.calculateNationalClassNaturalForestPercentArea(nationalClass)
      : null

    const formattedPrev = Numbers.format(naturalForestPercentAreaPrev ?? '')
    const formattedCurrent = Numbers.format(naturalForestPercentAreaCurrent ?? '')

    return Diff.diffChars(formattedPrev ?? '', formattedCurrent ?? '')
  }, [historyLastApprovedIsActive, nationalClass, naturalForestPercentAreaCurrent])
}

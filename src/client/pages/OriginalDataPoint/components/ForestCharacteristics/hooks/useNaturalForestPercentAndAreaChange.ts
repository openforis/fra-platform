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
  forestNaturalForestOfWhichPrimaryForestPercent?: string
  nationalClassIndex: number
  naturalForestPercentArea: BigNumber | null
}

type Returned = {
  naturalForestPercent: Array<Change>
  naturalForestPercentArea: Array<Change>
}

export const useNaturalForestPercentAndAreaChange = (props: Props): Returned => {
  const {
    forestNaturalForestOfWhichPrimaryForestPercent: forestNaturalForestOfWhichPrimaryForestPercentCurrent,
    nationalClassIndex,
    naturalForestPercentArea: naturalForestPercentAreaCurrent,
  } = props

  const originalDataPointHistory = useLastApprovedOriginalDataPoint()
  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()
  const nationalClass = originalDataPointHistory?.nationalClasses?.[nationalClassIndex]

  return useMemo<Returned>(() => {
    if (!historyLastApprovedIsActive) return undefined

    const canCalculate = !Objects.isEmpty(nationalClass)

    const naturalForestPercentAreaPrev = canCalculate
      ? ODPs.calculateNationalClassNaturalForestPercentArea(nationalClass)
      : null

    const formattedAreaPrev = Numbers.format(naturalForestPercentAreaPrev ?? '')
    const formattedAreaCurrent = Numbers.format(naturalForestPercentAreaCurrent ?? '')

    const naturalForestPercentArea = Diff.diffChars(formattedAreaPrev ?? '', formattedAreaCurrent ?? '')

    // forestNaturalForestOfWhichPrimaryForestPercent change
    const isZeroOrNullPrimaryForestPrev =
      naturalForestPercentAreaPrev === null || Numbers.eq(naturalForestPercentAreaPrev, 0)

    let naturalForestPercentPrev = isZeroOrNullPrimaryForestPrev
      ? 0
      : nationalClass?.forestNaturalForestOfWhichPrimaryForestPercent
    naturalForestPercentPrev = !canCalculate ? '' : naturalForestPercentPrev // Default to empty string if prev is not present
    const formattedNaturalForestPercentPrev = Numbers.format(naturalForestPercentPrev ?? '', 3)

    const isZeroOrNullPrimaryForestCurrent =
      naturalForestPercentAreaCurrent === null || Numbers.eq(naturalForestPercentAreaCurrent, 0)

    const naturalForestPercentCurrent = isZeroOrNullPrimaryForestCurrent
      ? 0
      : forestNaturalForestOfWhichPrimaryForestPercentCurrent
    const formattedNaturalForestPercentCurrent = Numbers.format(naturalForestPercentCurrent ?? '', 3)

    const naturalForestPercent = Diff.diffChars(
      formattedNaturalForestPercentPrev ?? '',
      formattedNaturalForestPercentCurrent ?? ''
    )

    return {
      naturalForestPercent,
      naturalForestPercentArea,
    }
  }, [
    forestNaturalForestOfWhichPrimaryForestPercentCurrent,
    historyLastApprovedIsActive,
    nationalClass,
    naturalForestPercentAreaCurrent,
  ])
}

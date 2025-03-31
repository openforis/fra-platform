import { useMemo } from 'react'

import * as Diff from 'diff'
import { Change } from 'diff'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ODPs } from 'meta/assessment/odps'

import { useLastApprovedOriginalDataPoint } from 'client/store/data/hooks/useLastApprovedOriginalDataPoint'
import { useODPDisplayHistory } from 'client/pages/OriginalDataPoint/components/hooks/useODPDisplayHistory'

type Props = {
  totalArea: string | null
  totalForestPercentArea: string | null
  totalLandArea: string | null
  totalOtherWoodedLandPercentArea: string | null
}

type Returned =
  | {
      [K in keyof Props]: Array<Change>
    }
  | undefined

export const useTotalsChange = (props: Props): Returned => {
  const {
    totalArea: totalAreaCurrent,
    totalForestPercentArea: totalForestPercentAreaCurrent,
    totalLandArea: totalLandAreaCurrent,
    totalOtherWoodedLandPercentArea: totalOtherWoodedLandPercentAreaCurrent,
  } = props

  const originalDataPointHistory = useLastApprovedOriginalDataPoint()
  const displayHistory = useODPDisplayHistory()

  return useMemo<Returned>(() => {
    if (!displayHistory) return undefined

    const canCalculate = !Objects.isEmpty(originalDataPointHistory)

    const totalAreaPrev = canCalculate
      ? Numbers.format(ODPs.calcTotalArea({ originalDataPoint: originalDataPointHistory }))
      : ''
    const totalArea = Diff.diffLines(totalAreaPrev ?? '', totalAreaCurrent ?? '')

    const totalForestPercentAreaPrev = canCalculate
      ? Numbers.format(ODPs.calcTotalFieldArea({ originalDataPoint: originalDataPointHistory, field: 'forestPercent' }))
      : ''
    const totalForestPercentArea = Diff.diffLines(totalForestPercentAreaPrev ?? '', totalForestPercentAreaCurrent ?? '')

    const totalLandAreaPrev = canCalculate
      ? Numbers.format(ODPs.calcTotalLandArea({ originalDataPoint: originalDataPointHistory }))
      : ''
    const totalLandArea = Diff.diffLines(totalLandAreaPrev ?? '', totalLandAreaCurrent ?? '')

    const totalOtherWoodedLandPercentAreaPrev = canCalculate
      ? Numbers.format(
          ODPs.calcTotalFieldArea({ originalDataPoint: originalDataPointHistory, field: 'otherWoodedLandPercent' })
        )
      : ''
    const totalOtherWoodedLandPercentArea = Diff.diffLines(
      totalOtherWoodedLandPercentAreaPrev ?? '',
      totalOtherWoodedLandPercentAreaCurrent ?? ''
    )

    return { totalArea, totalForestPercentArea, totalLandArea, totalOtherWoodedLandPercentArea }
  }, [
    displayHistory,
    originalDataPointHistory,
    totalAreaCurrent,
    totalForestPercentAreaCurrent,
    totalLandAreaCurrent,
    totalOtherWoodedLandPercentAreaCurrent,
  ])
}

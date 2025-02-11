import { useMemo } from 'react'

import * as Diff from 'diff'
import { Change } from 'diff'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ODPs } from 'meta/assessment'

import { useHistoryLastApprovedIsActive } from 'client/store/data'
import { useLastApprovedOriginalDataPoint } from 'client/store/data/hooks/useLastApprovedOriginalDataPoint'

type Props = {
  totalForestPlantationIntroducedPercentArea: string | null
  totalForestPlantationPercentArea: string | null
}

type Returned =
  | {
      [K in keyof Props]: Array<Change>
    }
  | undefined

export const usePlantationForestTotalsChange = (props: Props): Returned => {
  const {
    totalForestPlantationIntroducedPercentArea: totalForestPlantationIntroducedPercentAreaCurrent,
    totalForestPlantationPercentArea: totalForestPlantationPercentAreaCurrent,
  } = props

  const originalDataPointHistory = useLastApprovedOriginalDataPoint()
  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()

  return useMemo<Returned>(() => {
    if (!historyLastApprovedIsActive) return undefined

    const canCalculate = !Objects.isEmpty(originalDataPointHistory)

    const totalForestPlantationPercentAreaPrev = canCalculate
      ? Numbers.format(
          ODPs.calcTotalSubFieldArea({
            originalDataPoint: originalDataPointHistory,
            field: 'forestPercent',
            subField: 'forestPlantationPercent',
          })
        )
      : ''
    const totalForestPlantationPercentArea = Diff.diffLines(
      totalForestPlantationPercentAreaPrev ?? '',
      totalForestPlantationPercentAreaCurrent ?? ''
    )

    const totalForestPlantationIntroducedPercentAreaPrev = canCalculate
      ? Numbers.format(
          ODPs.calcTotalSubSubFieldArea({
            originalDataPoint: originalDataPointHistory,
            field: 'forestPercent',
            subField: 'forestPlantationPercent',
            subSubField: 'forestPlantationIntroducedPercent',
          })
        )
      : ''

    const totalForestPlantationIntroducedPercentArea = Diff.diffLines(
      totalForestPlantationIntroducedPercentAreaPrev ?? '',
      totalForestPlantationIntroducedPercentAreaCurrent ?? ''
    )

    return {
      totalForestPlantationIntroducedPercentArea,
      totalForestPlantationPercentArea,
    }
  }, [
    historyLastApprovedIsActive,
    originalDataPointHistory,
    totalForestPlantationIntroducedPercentAreaCurrent,
    totalForestPlantationPercentAreaCurrent,
  ])
}

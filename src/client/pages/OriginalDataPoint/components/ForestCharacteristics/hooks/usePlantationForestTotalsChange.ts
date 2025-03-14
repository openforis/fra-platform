import { useMemo } from 'react'

import * as Diff from 'diff'
import { Change } from 'diff'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ODPs } from 'meta/assessment'

import { useLastApprovedOriginalDataPoint } from 'client/store/data/hooks/useLastApprovedOriginalDataPoint'
import { useODPDisplayHistory } from 'client/pages/OriginalDataPoint/components/hooks/useODPDisplayHistory'

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
  const displayHistory = useODPDisplayHistory()

  return useMemo<Returned>(() => {
    if (!displayHistory) return undefined

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
    displayHistory,
    originalDataPointHistory,
    totalForestPlantationIntroducedPercentAreaCurrent,
    totalForestPlantationPercentAreaCurrent,
  ])
}

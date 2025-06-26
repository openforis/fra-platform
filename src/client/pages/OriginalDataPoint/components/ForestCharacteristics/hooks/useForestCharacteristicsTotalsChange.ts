import { useMemo } from 'react'

import * as Diff from 'diff'
import { Change } from 'diff'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ODPs } from 'meta/assessment/odps'

import { useLastApprovedOriginalDataPoint } from 'client/store/data/history/hooks/lastApprovedOriginalDataPoint'
import { useODPDisplayHistory } from 'client/pages/OriginalDataPoint/components/hooks/useODPDisplayHistory'

type Props = {
  totalForestNaturalPercentArea: string | null
  totalForestPercentArea: string | null
  totalForestPlantationPercentArea: string | null
  totalOtherPlantedForestPercentArea: string | null
}

type Returned =
  | {
      [K in keyof Props]: Array<Change>
    }
  | undefined

export const useForestCharacteristicsTotalsChange = (props: Props): Returned => {
  const {
    totalForestNaturalPercentArea: totalForestNaturalPercentAreaCurrent,
    totalForestPercentArea: totalForestPercentAreaCurrent,
    totalForestPlantationPercentArea: totalForestPlantationPercentAreaCurrent,
    totalOtherPlantedForestPercentArea: totalOtherPlantedForestPercentAreaCurrent,
  } = props

  const originalDataPointHistory = useLastApprovedOriginalDataPoint()
  const displayHistory = useODPDisplayHistory()

  return useMemo<Returned>(() => {
    if (!displayHistory) return undefined

    const canCalculate = !Objects.isEmpty(originalDataPointHistory)

    const totalForestPercentAreaPrev = canCalculate
      ? Numbers.format(ODPs.calcTotalFieldArea({ originalDataPoint: originalDataPointHistory, field: 'forestPercent' }))
      : ''
    const totalForestPercentArea = Diff.diffLines(totalForestPercentAreaPrev ?? '', totalForestPercentAreaCurrent ?? '')

    const totalForestNaturalPercentAreaPrev = canCalculate
      ? Numbers.format(
          ODPs.calcTotalSubFieldArea({
            originalDataPoint: originalDataPointHistory,
            field: 'forestPercent',
            subField: 'forestNaturalPercent',
          })
        )
      : ''
    const totalForestNaturalPercentArea = Diff.diffLines(
      totalForestNaturalPercentAreaPrev ?? '',
      totalForestNaturalPercentAreaCurrent ?? ''
    )

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

    const totalOtherPlantedForestPercentAreaPrev = canCalculate
      ? Numbers.format(
          ODPs.calcTotalSubFieldArea({
            originalDataPoint: originalDataPointHistory,
            field: 'forestPercent',
            subField: 'otherPlantedForestPercent',
          })
        )
      : ''
    const totalOtherPlantedForestPercentArea = Diff.diffLines(
      totalOtherPlantedForestPercentAreaPrev ?? '',
      totalOtherPlantedForestPercentAreaCurrent ?? ''
    )

    return {
      totalForestNaturalPercentArea,
      totalForestPercentArea,
      totalForestPlantationPercentArea,
      totalOtherPlantedForestPercentArea,
    }
  }, [
    displayHistory,
    originalDataPointHistory,
    totalForestNaturalPercentAreaCurrent,
    totalForestPercentAreaCurrent,
    totalForestPlantationPercentAreaCurrent,
    totalOtherPlantedForestPercentAreaCurrent,
  ])
}

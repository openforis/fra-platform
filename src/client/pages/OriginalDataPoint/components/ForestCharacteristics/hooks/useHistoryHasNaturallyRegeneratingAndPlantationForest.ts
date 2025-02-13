import { useMemo } from 'react'

import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ODPs } from 'meta/assessment'

import { useLastApprovedOriginalDataPoint } from 'client/store/data/hooks/useLastApprovedOriginalDataPoint'
import { useODPDisplayHistory } from 'client/pages/OriginalDataPoint/components/hooks/useODPDisplayHistory'

type Returned = {
  historyHasNaturallyRegeneratingForest: boolean
  historyHasPlantationForest: boolean
}

export const useHistoryHasNaturallyRegeneratingAndPlantationForest = (): Returned => {
  const originalDataPointHistory = useLastApprovedOriginalDataPoint()
  const displayHistory = useODPDisplayHistory()

  return useMemo<Returned>(() => {
    const canCalculate = !Objects.isEmpty(originalDataPointHistory)

    if (!displayHistory || !canCalculate) {
      return {
        historyHasNaturallyRegeneratingForest: false,
        historyHasPlantationForest: false,
      }
    }

    const plantationTotal = ODPs.calcTotalSubFieldArea({
      originalDataPoint: originalDataPointHistory,
      field: 'forestPercent',
      subField: 'forestPlantationPercent',
    })
    const historyHasPlantationForest = plantationTotal && Numbers.greaterThanOrEqualTo(plantationTotal, 0)

    const naturallyRegeneratingForestTotal = ODPs.calcTotalSubFieldArea({
      originalDataPoint: originalDataPointHistory,
      field: 'forestPercent',
      subField: 'forestNaturalPercent',
    })
    const historyHasNaturallyRegeneratingForest =
      naturallyRegeneratingForestTotal && Numbers.greaterThanOrEqualTo(naturallyRegeneratingForestTotal, 0)

    return {
      historyHasNaturallyRegeneratingForest,
      historyHasPlantationForest,
    }
  }, [displayHistory, originalDataPointHistory])
}

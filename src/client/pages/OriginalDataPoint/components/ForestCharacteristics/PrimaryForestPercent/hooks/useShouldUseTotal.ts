import { useMemo } from 'react'

import { ODPs, OriginalDataPoint } from 'meta/assessment'

export const useShouldUseTotal = (originalDataPoint: OriginalDataPoint): boolean => {
  return useMemo<boolean>(() => {
    return ODPs.shouldUseTotalPrimaryForestPercentage({ originalDataPoint })
  }, [originalDataPoint])
}

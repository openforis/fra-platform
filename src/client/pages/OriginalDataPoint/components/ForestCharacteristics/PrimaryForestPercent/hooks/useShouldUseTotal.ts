import { useMemo } from 'react'

import { ODPs } from 'meta/assessment/odps'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

export const useShouldUseTotal = (originalDataPoint: OriginalDataPoint): boolean => {
  return useMemo<boolean>(() => {
    return ODPs.shouldUseTotalPrimaryForestPercentage({ originalDataPoint })
  }, [originalDataPoint])
}

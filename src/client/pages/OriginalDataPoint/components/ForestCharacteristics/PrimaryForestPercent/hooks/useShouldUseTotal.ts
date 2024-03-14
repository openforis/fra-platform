import { useMemo } from 'react'

import { ODPs } from 'meta/assessment'

import { useOriginalDataPoint } from 'client/store/ui/originalDataPoint'

export const useShouldUseTotal = (): boolean => {
  const originalDataPoint = useOriginalDataPoint()
  return useMemo<boolean>(() => {
    return ODPs.shouldUseTotalPrimaryForestPercentage({ originalDataPoint })
  }, [originalDataPoint])
}

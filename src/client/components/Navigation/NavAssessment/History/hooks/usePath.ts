import { useMemo } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { HistoryTarget } from 'meta/cycleData'

export const usePath = (target: HistoryTarget): string => {
  return useMemo<string>(() => ApiEndPoint.CycleData.history(target), [target])
}

import { useMemo } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Histories, HistoryItemSectionKey } from 'meta/cycleData'

export const usePath = (sectionKey: HistoryItemSectionKey): string => {
  const { sectionName, name } = Histories.getHistoryItemKeyParts(sectionKey)

  return useMemo<string>(() => ApiEndPoint.CycleData.history(sectionName, name), [name, sectionName])
}

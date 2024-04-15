import { ActivityLog } from 'meta/assessment'
import { HistoryTarget } from 'meta/cycleData'

import { DataSelector } from 'client/store/data/selectors'
import { useAppSelector } from 'client/store/store'

export const useHistoryCompareItem = (target: HistoryTarget): ActivityLog<never> | undefined => {
  return useAppSelector((state) => DataSelector.History.getHistoryCompareItem(state, target))
}

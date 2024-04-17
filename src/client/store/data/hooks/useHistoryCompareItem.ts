import { ActivityLog } from 'meta/assessment'
import { HistoryTarget } from 'meta/cycleData'

import { DataSelector } from 'client/store/data/selectors'
import { useAppSelector } from 'client/store/store'

export const useHistoryCompareItem = <Target>(target: HistoryTarget): ActivityLog<Target> | undefined => {
  return useAppSelector((state) => DataSelector.History.getHistoryCompareItem(state, target))
}

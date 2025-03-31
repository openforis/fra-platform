import { ActivityLog } from 'meta/assessment/activityLog'
import { HistoryTarget } from 'meta/cycleData/historyActivities'

import { DataSelector } from 'client/store/data/selectors'
import { useAppSelector } from 'client/store/store'

export const useHistoryActivitiesCompareItem = <Target>(target: HistoryTarget): ActivityLog<Target> | undefined => {
  return useAppSelector((state) => DataSelector.History.getHistoryCompareItem(state, target))
}

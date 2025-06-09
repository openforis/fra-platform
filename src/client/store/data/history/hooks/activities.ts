import { Objects } from 'utils/objects'

import { ActivityLog } from 'meta/assessment/activityLog'
import { HistoryTarget } from 'meta/cycleData/historyActivities'

import { HistorySelectors } from 'client/store/data/history/selectors'
import { HistoryActivitiesState } from 'client/store/data/history/state'
import { useAppSelector } from 'client/store/hooks'

export const useHistoryActivitiesIsActive = (): boolean => {
  const items = useAppSelector(HistorySelectors.getHistoryItems)
  return !Objects.isEmpty(items)
}

export const useHistoryActivities = (): HistoryActivitiesState => {
  return useAppSelector(HistorySelectors.getHistoryActivities)
}

export const useHistoryActivitiesCompareItem = <Target>(target: HistoryTarget): ActivityLog<Target> | undefined => {
  return useAppSelector((state) => HistorySelectors.getHistoryCompareItem(state, target))
}

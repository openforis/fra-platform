import { DataSelector } from 'client/store/data/selectors'
import { HistoryActivitiesState } from 'client/store/data/state'
import { useAppSelector } from 'client/store/hooks'

export const useHistoryActivities = (): HistoryActivitiesState => {
  return useAppSelector(DataSelector.History.getHistoryActivities)
}

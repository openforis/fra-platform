import { Objects } from 'utils/objects'

import { DataSelector } from 'client/store/data/selectors'
import { useAppSelector } from 'client/store/store'

export const useHistoryActivitiesIsActive = (): boolean => {
  const items = useAppSelector(DataSelector.History.getHistoryItems)
  return !Objects.isEmpty(items)
}

import { DataSelector } from 'client/store/data/selectors'
import { HistoryState } from 'client/store/data/stateType'
import { useAppSelector } from 'client/store/store'

export const useHistory = (): HistoryState => {
  return useAppSelector(DataSelector.History.getHistory)
}

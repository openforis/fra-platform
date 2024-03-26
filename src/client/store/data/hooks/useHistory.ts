import { HistoryState } from 'client/store/data/stateType'
import { RootState } from 'client/store/RootState'
import { useAppSelector } from 'client/store/store'

export const useHistory = (): HistoryState => {
  return useAppSelector((state: RootState) => state.data.history)
}

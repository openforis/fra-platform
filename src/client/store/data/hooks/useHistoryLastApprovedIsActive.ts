import { DataSelector } from 'client/store/data/selectors'
import { useAppSelector } from 'client/store/store'

export const useHistoryLastApprovedIsActive = (): boolean => {
  return useAppSelector(DataSelector.History.isHistoryLastApprovedActive)
}

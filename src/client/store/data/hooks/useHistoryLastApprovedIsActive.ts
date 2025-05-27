import { DataSelector } from 'client/store/data/selectors'
import { useAppSelector } from 'client/store/hooks'

export const useHistoryLastApprovedIsActive = (): boolean => {
  return useAppSelector(DataSelector.History.isHistoryLastApprovedActive)
}

import { HistorySelectors } from 'client/store/data/history/selectors'
import { useAppSelector } from 'client/store/hooks'

export const useHistoryLastApprovedIsActive = (): boolean => {
  return useAppSelector(HistorySelectors.isHistoryLastApprovedActive)
}

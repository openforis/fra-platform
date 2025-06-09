import { useHistoryLastApprovedIsActive } from 'client/store/data/history/hooks/lastApproved'
import { useHistoryLastApprovedODPFetched } from 'client/store/data/history/hooks/lastApprovedOriginalDataPoint'

export const useODPDisplayHistory = (): boolean => {
  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()
  const historyLastApprovedODPFetched = useHistoryLastApprovedODPFetched()
  return historyLastApprovedIsActive && historyLastApprovedODPFetched
}

import { useHistoryLastApprovedIsActive, useHistoryLastApprovedODPFetched } from 'client/store/data'

export const useODPDisplayHistory = (): boolean => {
  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()
  const historyLastApprovedODPFetched = useHistoryLastApprovedODPFetched()
  return historyLastApprovedIsActive && historyLastApprovedODPFetched
}

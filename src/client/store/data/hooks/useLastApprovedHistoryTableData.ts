import { RecordAssessmentData } from 'meta/data'

import { useAppSelector } from 'client/store'
import { DataSelector } from 'client/store/data/selectors'

export const useLastApprovedHistoryTableData = (): RecordAssessmentData => {
  return useAppSelector((state) => DataSelector.History.getLastApprovedTableData(state))
}

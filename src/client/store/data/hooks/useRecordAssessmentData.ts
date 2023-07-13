import { RecordAssessmentData } from 'meta/data'

import { useAppSelector } from 'client/store/store'

export const useRecordAssessmentData = (): RecordAssessmentData => useAppSelector((state) => state.data.tableData)

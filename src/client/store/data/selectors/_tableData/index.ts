import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'client/store/types'

const getRecordAssessmentData = createSelector(
  (state: RootState) => state.dataDep.tableData,
  (data) => data
)

export const TableData = {
  getRecordAssessmentData,
}

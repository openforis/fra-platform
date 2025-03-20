import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'client/store/RootState'

const getRecordAssessmentData = createSelector(
  (state: RootState) => state.data.tableData,
  (data) => data
)

export const TableData = {
  getRecordAssessmentData,
}

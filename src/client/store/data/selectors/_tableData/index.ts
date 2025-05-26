import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'client/store/types'

const getRecordAssessmentData = createSelector(
  (state: RootState) => state.data.tableData,
  (data) => data
)

export const TableData = {
  getRecordAssessmentData,
}

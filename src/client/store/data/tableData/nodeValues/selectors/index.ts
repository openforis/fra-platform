import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'client/store/types'

const getState = (state: RootState) => state.data.tableData

const getRecordAssessmentData = createSelector(getState, (data) => data.nodeValues)

export const NodeValuesSelectors = {
  getRecordAssessmentData,
}

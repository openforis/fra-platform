import { createSlice, Reducer } from '@reduxjs/toolkit'
import { getTableSections } from '@client/store/pages/assessmentSection/actions/getTableSections'
import { getTableData } from './actions/getTableData'
import { AssessmentSectionState } from './stateType'

const initialState: AssessmentSectionState = {
  data: null,
  tableSections: [],
}

export const assessmentSectionSlice = createSlice({
  name: 'assessmentSection',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getTableSections.fulfilled, (state, { payload }) => {
      state.tableSections = payload
    })

    builder.addCase(getTableData.fulfilled, (state, { payload }) => {
      state.data = payload
    })
  },
})

export const AssessmentSectionActions = {
  ...assessmentSectionSlice.actions,
  getTableSections,
  getTableData,
}

export default assessmentSectionSlice.reducer as Reducer<AssessmentSectionState>

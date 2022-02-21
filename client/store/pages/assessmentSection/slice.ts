import { createSlice, Reducer } from '@reduxjs/toolkit'
import { getTableSections } from '@client/store/pages/assessmentSection/actions/getTableSections'
import { getSectionData } from './actions/getSectionData'
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

    builder.addCase(getSectionData.fulfilled, (state, { payload }) => {
      if (!state.data) state.data = {}
      payload.forEach(({ tableName, data }) => {
        state.data[tableName] = data
      })
    })
  },
})

export const AssessmentSectionActions = {
  ...assessmentSectionSlice.actions,
  getTableSections,
  getSectionData,
}

export default assessmentSectionSlice.reducer as Reducer<AssessmentSectionState>

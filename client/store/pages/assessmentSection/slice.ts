import { createSlice, Reducer } from '@reduxjs/toolkit'
import { getSectionData } from './actions/getSectionData'
import { AssessmentSectionState } from './stateType'

const initialState: AssessmentSectionState = {
  data: null,
  metaData: null,
}

export const assessmentSectionSlice = createSlice({
  name: 'assessmentSection',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getSectionData.fulfilled, (state, { payload }) => {
      if (!state.data) state.data = {}
      payload.forEach(({ tableName, data }) => {
        if (!state.data[tableName]) {
          // @ts-ignore
          state.data[tableName] = {}
        }
        state.data[tableName] = data
      })
    })
  },
})

export const AssessmentSectionActions = {
  getSectionData,
}

export default assessmentSectionSlice.reducer as Reducer<AssessmentSectionState>

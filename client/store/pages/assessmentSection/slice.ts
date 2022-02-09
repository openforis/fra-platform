import { createSlice, Reducer } from '@reduxjs/toolkit'
import { getSectionTablesMetadata } from '@client/store/pages/assessmentSection/actions/getSectionTablesMetadata'
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
    builder.addCase(getSectionTablesMetadata.fulfilled, (state, { payload }) => {
      state.metaData = payload
    })

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
  getSectionTablesMetadata,
  getSectionData,
}

export default assessmentSectionSlice.reducer as Reducer<AssessmentSectionState>

import { createSlice, Reducer } from '@reduxjs/toolkit'
import { getSectionMetadata } from '@client/store/pages/assessmentSection/actions/getSectionMetadata'
import { getSectionData } from './actions/getSectionData'
import { AssessmentSectionState } from './stateType'

const initialState: AssessmentSectionState = {
  data: null,
  metadata: null,
}

export const assessmentSectionSlice = createSlice({
  name: 'assessmentSection',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getSectionMetadata.fulfilled, (state, { payload }) => {
      state.metadata = payload
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
  getSectionMetadata,
  getSectionData,
}

export default assessmentSectionSlice.reducer as Reducer<AssessmentSectionState>

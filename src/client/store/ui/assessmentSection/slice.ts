import { createSlice, Reducer } from '@reduxjs/toolkit'

import { DataActions } from '@client/store/data'

import { postEstimate } from '../../data/actions/postEstimate'
import { AssessmentSectionState } from './stateType'

const initialState: AssessmentSectionState = {
  estimationPending: false,
  showOriginalDataPoint: true,
}

export const assessmentSectionSlice = createSlice({
  name: 'assessmentSection',
  initialState,
  reducers: {
    reset: () => initialState,
    toggleShowOriginalDataPoint: (state) => {
      state.showOriginalDataPoint = !state.showOriginalDataPoint
    },
  },
  extraReducers: (builder) => {
    builder.addCase(DataActions.postEstimate.pending, (state) => {
      state.estimationPending = true
    })

    builder.addCase(DataActions.postEstimate.fulfilled, (state) => {
      state.estimationPending = false
    })
  },
})

export const AssessmentSectionActions = {
  ...assessmentSectionSlice.actions,

  postEstimate,
}

export default assessmentSectionSlice.reducer as Reducer<AssessmentSectionState>

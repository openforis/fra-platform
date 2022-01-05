import { createSlice, Reducer } from '@reduxjs/toolkit'
import { AssessmentState } from './stateType'
import { initApp } from './actions/initApp'

const initialState: AssessmentState = {}

export const assessmentSlice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(initApp.fulfilled, (state, { payload }) => {
      state.assessment = payload.assessment
      state.countryISOs = payload.countryISOs
      state.regionGroups = payload.regionGroups
    })
  },
})

export const AssessmentActions = {
  initApp,
}

export default assessmentSlice.reducer as Reducer<AssessmentState>

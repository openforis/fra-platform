import { createSlice, Reducer } from '@reduxjs/toolkit'

import { getMetaCacheReducer } from 'client/store/assessment/extraReducers/getMetaCacheReducer'

import { initAppReducer } from './extraReducers/initAppReducer'
import { getAssessment, getMetaCache, getSections, initApp } from './actions'
import { AssessmentState, initialState } from './state'

export const assessmentSlice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    initAppReducer(builder)
    getMetaCacheReducer(builder)

    builder.addCase(getSections.fulfilled, (state, { payload }) => {
      state.sections = payload
    })
  },
})

export const AssessmentActions = {
  ...assessmentSlice.actions,
  initApp,
  getAssessment,
  getMetaCache,
  getSections,
}

export default assessmentSlice.reducer as Reducer<AssessmentState>

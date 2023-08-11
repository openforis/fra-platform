import { createSlice, Reducer } from '@reduxjs/toolkit'

import { getMetaCache, initApp } from 'client/store/assessment/actions'
import { getMetaCacheReducer } from 'client/store/assessment/extraReducers/getMetaCacheReducer'
import { initAppReducer } from 'client/store/assessment/extraReducers/initAppReducer'
import { AssessmentState, initialState } from 'client/store/assessment/state'

export const assessmentSlice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    initAppReducer(builder)
    getMetaCacheReducer(builder)
  },
})

export const AssessmentActions = {
  ...assessmentSlice.actions,
  initApp,
  getMetaCache,
}

export default assessmentSlice.reducer as Reducer<AssessmentState>

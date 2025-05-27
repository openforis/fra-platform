import { createSlice } from '@reduxjs/toolkit'

import { getMetaCacheReducer } from 'client/store/meta/assessment/slice/extraReducers/getMetaCacheReducer'
import { initAppReducer } from 'client/store/meta/assessment/slice/extraReducers/initAppReducer'
import { initialState } from 'client/store/meta/assessment/state'

export const AssessmentSlice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    initAppReducer(builder)
    getMetaCacheReducer(builder)
  },
})

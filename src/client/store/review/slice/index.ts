import { createSlice } from '@reduxjs/toolkit'

import { resetReducer } from 'client/store/review/slice/extraReducers/resetReducer'
import { statusReducer } from 'client/store/review/slice/extraReducers/statusReducer'
import { summaryReducer } from 'client/store/review/slice/extraReducers/summaryReducer'
import { initialState } from 'client/store/review/state'

import { ReviewSliceName } from './name'

export const ReviewSlice = createSlice({
  name: ReviewSliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    resetReducer(builder)
    summaryReducer(builder)
    statusReducer(builder)
  },
})

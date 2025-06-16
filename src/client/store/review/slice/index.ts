import { createSlice } from '@reduxjs/toolkit'

import { resetReducer } from 'client/store/review/slice/extraReducers/resetReducer'
import { statusReducer } from 'client/store/review/slice/extraReducers/statusReducer'
import { summaryReducer } from 'client/store/review/slice/extraReducers/summaryReducer'
import { initialState } from 'client/store/review/state'

export const ReviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    resetReducer(builder)
    summaryReducer(builder)
    statusReducer(builder)
  },
})

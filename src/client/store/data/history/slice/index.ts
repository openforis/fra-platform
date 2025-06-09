import { createSlice } from '@reduxjs/toolkit'

import { getDescriptionsHistoryReducer } from 'client/store/data/history/slice/extraReducers/getDescriptionsHistory'
import { getOriginalDataPointHistoryReducer } from 'client/store/data/history/slice/extraReducers/getOriginalDataPointHistory'
import { getTableDataHistoryReducer } from 'client/store/data/history/slice/extraReducers/getTableDataHistory'
import { activitiesReducer } from 'client/store/data/history/slice/reducers/activities'
import { lastApprovedReducer } from 'client/store/data/history/slice/reducers/lastApproved'
import { initialState } from 'client/store/data/history/state'

export const HistorySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    activitiesReducer(builder)
    getDescriptionsHistoryReducer(builder)
    getOriginalDataPointHistoryReducer(builder)
    getTableDataHistoryReducer(builder)
    lastApprovedReducer(builder)
  },
})

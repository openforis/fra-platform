import { createSlice } from '@reduxjs/toolkit'

import { resetReducer } from 'client/store/data/originalDataPoint/slice/extraReducers/resetReducer'
import { setOriginalDataPointReducer } from 'client/store/data/originalDataPoint/slice/extraReducers/setOriginalDataPointReducer'
import { setReservedYearsReducer } from 'client/store/data/originalDataPoint/slice/extraReducers/setReservedYearsReducer'
import { setUpdatingReducer } from 'client/store/data/originalDataPoint/slice/extraReducers/setUpdatingReducer'
import { initialState } from 'client/store/data/originalDataPoint/state'

import { OriginalDataPointSliceName } from './name'

export const OriginalDataPointSlice = createSlice({
  name: OriginalDataPointSliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    resetReducer(builder)
    setReservedYearsReducer(builder)

    setOriginalDataPointReducer(builder)
    setUpdatingReducer(builder)
  },
})

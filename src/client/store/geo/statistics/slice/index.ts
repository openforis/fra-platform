import { createSlice } from '@reduxjs/toolkit'

import { getExtraEstimationReducer } from 'client/store/geo/statistics/slice/extraReducers/getExtraEstimationReducer'
import { getForestEstimationsReducer } from 'client/store/geo/statistics/slice/extraReducers/getForestEstimationsReducer'
import { setEstimationsErrorKeyReducer } from 'client/store/geo/statistics/slice/extraReducers/setEstimationsErrorKeyReducer'
import { setForestEstimationsTableDataReducer } from 'client/store/geo/statistics/slice/extraReducers/setForestEstimationsTableDataReducer'
import { initialState } from 'client/store/geo/statistics/state'

import { GeoStatisticsSliceName } from './name'

export const GeoStatisticsSlice = createSlice({
  initialState,
  name: GeoStatisticsSliceName,
  reducers: {},
  extraReducers: (builder) => {
    getExtraEstimationReducer(builder)
    getForestEstimationsReducer(builder)
    setEstimationsErrorKeyReducer(builder)
    setForestEstimationsTableDataReducer(builder)
  },
})

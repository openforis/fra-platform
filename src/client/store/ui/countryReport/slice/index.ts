import { createSlice } from '@reduxjs/toolkit'

import { toggleDataLockReducer } from 'client/store/ui/countryReport/slice/extraReducers/toggleDataLockReducer'
import { toggleEditDescriptionReducer } from 'client/store/ui/countryReport/slice/extraReducers/toggleEditDescriptionReducer'
import { toggleShowOriginalDataPointReducer } from 'client/store/ui/countryReport/slice/extraReducers/toggleShowOriginalDataPointReducer'
import { initialState } from 'client/store/ui/countryReport/state'

export const CountryReportSlice = createSlice({
  name: 'countryReport',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    toggleDataLockReducer(builder)
    toggleEditDescriptionReducer(builder)
    toggleShowOriginalDataPointReducer(builder)
  },
})

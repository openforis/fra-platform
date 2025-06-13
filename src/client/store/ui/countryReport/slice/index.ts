import { createSlice } from '@reduxjs/toolkit'

import { navigationReducer } from 'client/store/ui/countryReport/slice/extraReducers/navigationReducer'
import { setGlobalCountriesReducer } from 'client/store/ui/countryReport/slice/extraReducers/setGlobalCountriesReducer'
import { toggleDataLockReducer } from 'client/store/ui/countryReport/slice/extraReducers/toggleDataLockReducer'
import { toggleEditDescriptionReducer } from 'client/store/ui/countryReport/slice/extraReducers/toggleEditDescriptionReducer'
import { toggleShowOriginalDataPointReducer } from 'client/store/ui/countryReport/slice/extraReducers/toggleShowOriginalDataPointReducer'
import { initialState } from 'client/store/ui/countryReport/state'

export const CountryReportSlice = createSlice({
  name: 'countryReport',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    setGlobalCountriesReducer(builder)
    toggleDataLockReducer(builder)
    toggleEditDescriptionReducer(builder)
    toggleShowOriginalDataPointReducer(builder)
    navigationReducer(builder)
  },
})

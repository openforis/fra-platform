import { createSlice } from '@reduxjs/toolkit'

import { getAreasReducer } from 'client/store/area/slice/extraReducers/getAreasReducer'
import { setCountryReducer } from 'client/store/area/slice/extraReducers/setCountryReducer'
import { updateCountryPropReducer } from 'client/store/area/slice/extraReducers/updateCountryPropReducer'
import { updateNodeValuesReducer } from 'client/store/area/slice/extraReducers/updateNodeValuesReducer'
import { initialState } from 'client/store/area/state'

import { AreaSliceName } from './name'

export const AreaSlice = createSlice({
  name: AreaSliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    getAreasReducer(builder)
    // updateCountryReducer(builder) // uncomment this if you need to edit other than status and handle the response
    updateCountryPropReducer(builder)
    setCountryReducer(builder)
    updateNodeValuesReducer(builder)
  },
})

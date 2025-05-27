import { createSlice } from '@reduxjs/toolkit'

import { getAreasReducer } from 'client/store/area/extraReducers/getAreasReducer'
import { updateCountryPropReducer } from 'client/store/area/extraReducers/updateCountryPropReducer'
import { updateCountryStatusReducer } from 'client/store/area/extraReducers/updateCountryStatusReducer'
import { updateNodeValuesReducer } from 'client/store/area/extraReducers/updateNodeValuesReducer'

import { initialState } from './state'

export const AreaSlice = createSlice({
  name: 'area',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    getAreasReducer(builder)
    // updateCountryReducer(builder) // uncomment this if you need to edit other than status and handle the response
    updateCountryPropReducer(builder)
    updateCountryStatusReducer(builder)
    updateNodeValuesReducer(builder)
  },
})

import { createSlice, Reducer } from '@reduxjs/toolkit'

import { getAreas } from 'client/store/area/actions/getAreas'
import { updateCountry } from 'client/store/area/actions/updateCountry'
import { updateCountryProp } from 'client/store/area/actions/updateCountryProp'
import { getAreasReducer } from 'client/store/area/extraReducers/getAreasReducer'
import { updateCountryPropReducer } from 'client/store/area/extraReducers/updateCountryPropReducer'
import { updateCountryReducer } from 'client/store/area/extraReducers/updateCountryReducer'
import { updateNodeValuesReducer } from 'client/store/area/extraReducers/updateNodeValuesReducer'

import { AreaState, initialState } from './state'

export const areaSlice = createSlice({
  name: 'area',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    getAreasReducer(builder)
    updateCountryReducer(builder)
    updateCountryPropReducer(builder)
    updateNodeValuesReducer(builder)
  },
})

export const AreaActions = {
  ...areaSlice.actions,
  getAreas,
  updateCountry,
  updateCountryProp,
}

export default areaSlice.reducer as Reducer<AreaState>

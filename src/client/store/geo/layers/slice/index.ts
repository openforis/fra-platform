import { createSlice } from '@reduxjs/toolkit'

import { getLayerMapIdReducer } from 'client/store/geo/layers/slice/extraReducers/getLayerMapIdReducer'
import { resetLayerStatusReducer } from 'client/store/geo/layers/slice/extraReducers/resetLayerStatusReducer'
import { setAgreementPropertyReducer } from 'client/store/geo/layers/slice/extraReducers/setAgreementPropertyReducer'
import { setOpacityReducer } from 'client/store/geo/layers/slice/extraReducers/setOpacityReducer'
import { setOptionsPropertyReducer } from 'client/store/geo/layers/slice/extraReducers/setOptionsPropertyReducer'
import { setPropertyReducer } from 'client/store/geo/layers/slice/extraReducers/setPropertyReducer'
import { initialState } from 'client/store/geo/layers/state'

import { LayersSliceName } from './name'

export const LayersSlice = createSlice({
  initialState,
  name: LayersSliceName,
  reducers: {},
  extraReducers: (builder) => {
    getLayerMapIdReducer(builder)
    resetLayerStatusReducer(builder)
    setAgreementPropertyReducer(builder)
    setOpacityReducer(builder)
    setOptionsPropertyReducer(builder)
    setPropertyReducer(builder)
  },
})

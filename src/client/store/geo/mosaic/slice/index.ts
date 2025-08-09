import { createSlice } from '@reduxjs/toolkit'

import { applyOptionsReducer } from 'client/store/geo/mosaic/slice/extraReducers/applyOptionsReducer'
import { getUrlTemplateReducer } from 'client/store/geo/mosaic/slice/extraReducers/getUrlTemplateReducer'
import { setUiOptionsReducer } from 'client/store/geo/mosaic/slice/extraReducers/setUiOptionsReducer'
import { toggleLayerReducer } from 'client/store/geo/mosaic/slice/extraReducers/toggleLayerReducer'
import { initialState } from 'client/store/geo/mosaic/state'

import { MosaicSliceName } from './name'

export const MosaicSlice = createSlice({
  initialState,
  name: MosaicSliceName,
  reducers: {},
  extraReducers: (builder) => {
    applyOptionsReducer(builder)
    getUrlTemplateReducer(builder)
    setUiOptionsReducer(builder)
    toggleLayerReducer(builder)
  },
})

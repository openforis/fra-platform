import { createSlice } from '@reduxjs/toolkit'

import { getUrlTemplateReducer } from 'client/store/geo/mosaic/slice/extraReducers/getUrlTemplateReducer'
import { resetUrlTemplateDataReducer } from 'client/store/geo/mosaic/slice/extraReducers/resetUrlTemplateDataReducer'
import { setOptionReducer } from 'client/store/geo/mosaic/slice/extraReducers/setOptionReducer'
import { toggleLayerReducer } from 'client/store/geo/mosaic/slice/extraReducers/toggleLayerReducer'
import { initialState } from 'client/store/geo/mosaic/state'

import { MosaicSliceName } from './name'

export const MosaicSlice = createSlice({
  initialState,
  name: MosaicSliceName,
  reducers: {},
  extraReducers: (builder) => {
    getUrlTemplateReducer(builder)
    resetUrlTemplateDataReducer(builder)
    setOptionReducer(builder)
    toggleLayerReducer(builder)
  },
})

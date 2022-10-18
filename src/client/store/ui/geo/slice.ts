import { createSlice, Reducer } from '@reduxjs/toolkit'

import { postMosaicOptions } from './actions/postMosaicOptions'
import { GeoState } from './stateType'

const initialState: GeoState = {
  selectedPanel: null,
  mosaicOptions: {
    sources: [],
  },
  forestOptions: {
    sources: [],
  },
  mosaicUrl: '',
}

export const geoSlice = createSlice({
  name: 'geo',
  initialState,
  reducers: {
    updateMosaicOptions: (state, { payload }) => {
      state.mosaicOptions = payload
    },
    updateSelectedPanel: (state, { payload }) => {
      state.selectedPanel = payload
    },
    updateForestSource: (state, { payload }) => {
      state.selectedForestSource = payload
    },
    updateForestOptions: (state, { payload }) => {
      state.forestOptions = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postMosaicOptions.fulfilled, (state, { payload }) => {
      state.mosaicUrl = payload.urlTemplate
    })
  },
})

export const GeoActions = {
  ...geoSlice.actions,
  postMosaicOptions,
  getForestOptions,
}

export default geoSlice.reducer as Reducer<GeoState>

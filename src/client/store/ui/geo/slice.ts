import { createSlice, Reducer } from '@reduxjs/toolkit'

import { postMosaicOptions } from './actions/postMosaicOptions'
import { getForestLayer } from './actions'
import { GeoState } from './stateType'

const initialState: GeoState = {
  selectedPanel: null,
  mosaicOptions: {
    sources: [],
  },
  forestOptions: {
    sources: [],
    fetchedLayers: {},
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
    updateForestOptions: (state, { payload }) => {
      state.forestOptions = payload
    },
    addForestLayer: (state, { payload }) => {
      state.forestOptions.sources.push(payload)
    },
    removeForestLayer: (state, { payload }) => {
      const i = state.forestOptions.sources.indexOf(payload)
      if (i === -1) return
      state.forestOptions.sources.splice(i, 1, payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postMosaicOptions.fulfilled, (state, { payload }) => {
        state.mosaicUrl = payload.urlTemplate
      })
      .addCase(getForestLayer.fulfilled, (state, { payload: [mapLayerKey, mapId] }) => {
        state.forestOptions.fetchedLayers[mapLayerKey] = mapId
      })
  },
})

export const GeoActions = {
  ...geoSlice.actions,
  postMosaicOptions,
}

export default geoSlice.reducer as Reducer<GeoState>

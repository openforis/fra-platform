import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, Reducer } from '@reduxjs/toolkit'

import { ForestSource, HansenPercentage } from '@meta/geo/forest'

import { postMosaicOptions } from './actions/postMosaicOptions'
import { getForestLayer } from './actions'
import { GeoState } from './stateType'

const initialState: GeoState = {
  selectedPanel: null,
  mosaicOptions: {
    sources: [],
  },
  forestOptions: {
    selected: [],
    fetchedLayers: {},
    hansenPercentage: 10,
    agreementLayerSelected: false,
    agreementLevel: 1,
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
    toggleForestLayer: (state, { payload }: PayloadAction<ForestSource>) => {
      const i = state.forestOptions.selected.findIndex((key) => key === payload)
      if (i === -1) {
        state.forestOptions.selected.push(payload)
      } else {
        state.forestOptions.selected.splice(i, 1)
      }
    },
    setHansenPercentage: (state, { payload }: PayloadAction<HansenPercentage>) => {
      state.forestOptions.hansenPercentage = payload
    },
    setAgreementLayerSelected: (state, { payload }: PayloadAction<boolean>) => {
      state.forestOptions.agreementLayerSelected = payload
    },
    setAgreementLevel: (state, { payload }: PayloadAction<number>) => {
      state.forestOptions.agreementLevel = payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postMosaicOptions.fulfilled, (state, { payload }) => {
        state.mosaicUrl = payload.urlTemplate
      })
      .addCase(getForestLayer.fulfilled, (state, { payload: [key, mapId] }) => {
        state.forestOptions.fetchedLayers[key] = mapId
      })
  },
})

export const GeoActions = {
  ...geoSlice.actions,
  postMosaicOptions,
}

export default geoSlice.reducer as Reducer<GeoState>

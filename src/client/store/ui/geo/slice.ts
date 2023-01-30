import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, Reducer } from '@reduxjs/toolkit'

import { forestAgreementRecipes, ForestSource, HansenPercentage } from '@meta/geo/forest'

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
    opacity: {},
    hansenPercentage: 10,
    agreementLayerSelected: false,
    agreementLevel: 1,
    recipe: 'custom',
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
        // Reset opacity
        delete state.forestOptions.opacity[payload]
      }
    },
    setForestLayers: (
      state,
      { payload: { sources, opacity } }: PayloadAction<{ sources: ForestSource[]; opacity?: number }>
    ) => {
      state.forestOptions.selected = sources
      state.forestOptions.opacity = {}

      if (opacity !== undefined) {
        state.forestOptions.selected.forEach((key) => {
          state.forestOptions.opacity[key] = opacity
        })
      }
    },
    setOpacity: (state, { payload: { key, opacity } }: PayloadAction<{ key: string; opacity: number }>) => {
      state.forestOptions.opacity[key] = opacity
    },
    setHansenPercentage: (state, { payload }: PayloadAction<HansenPercentage>) => {
      state.forestOptions.hansenPercentage = payload
    },
    setAgreementLayerSelected: (state, { payload }: PayloadAction<boolean>) => {
      state.forestOptions.agreementLayerSelected = payload
      if (!payload) {
        delete state.forestOptions.opacity.Agreement
      }
    },
    setAgreementLevel: (state, { payload }: PayloadAction<number>) => {
      state.forestOptions.agreementLevel = payload
    },
    resetAgreementLayer: (state) => {
      state.forestOptions.agreementLayerSelected = initialState.forestOptions.agreementLayerSelected
      state.forestOptions.agreementLevel = initialState.forestOptions.agreementLevel
    },
    setRecipe: (state, { payload }: PayloadAction<string>) => {
      const recipe = forestAgreementRecipes.find((r) => r.forestAreaDataProperty === payload)
      const opacity = 0
      const agreementLevel = 1

      // Set the selected recipe
      state.forestOptions.recipe = payload

      if (!recipe) return

      // Select the layers based on the recipe and set their opacity
      state.forestOptions.selected = recipe.layers
      state.forestOptions.opacity = Object.fromEntries(state.forestOptions.selected.map((key) => [key, opacity]))
      // Set Hansen percentage based on the recipe
      if (recipe.gteHansenTreeCoverPerc) {
        state.forestOptions.hansenPercentage = recipe.gteHansenTreeCoverPerc
      }
      // Select agreement layer and set agreement level
      state.forestOptions.agreementLayerSelected = true
      state.forestOptions.agreementLevel = agreementLevel
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

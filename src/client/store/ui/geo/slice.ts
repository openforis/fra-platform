import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, Reducer } from '@reduxjs/toolkit'

import { ForestEstimations, LayerStatus, MosaicOptions, MosaicSource } from '@meta/geo'
import { forestAgreementRecipes, ForestSource, HansenPercentage } from '@meta/geo/forest'

import { postMosaicOptions } from './actions/postMosaicOptions'
import { getForestEstimationData, getForestLayer } from './actions'
import { GeoState } from './stateType'

const initialMosaicOptions: MosaicOptions = {
  sources: ['landsat'],
  year: 2020,
  maxCloudCoverage: 30,
}

const initialState: GeoState = {
  isMapAvailable: false,
  selectedPanel: null,
  mosaicOptions: {
    ui: { ...initialMosaicOptions },
    applied: { ...initialMosaicOptions },
    mosaicSelected: false,
    mosaicPending: false,
    mosaicFailed: false,
    mosaicUrl: {},
  },
  forestOptions: {
    selected: [],
    fetchedLayers: {},
    pendingLayers: {},
    failedLayers: {},
    opacity: {},
    hansenPercentage: 10,
    agreementLayerSelected: false,
    agreementLayerStatus: null,
    agreementLevel: 1,
    agreementPalette: [],
    recipe: 'custom',
    customAssetId: null,
  },
  geoStatistics: {
    forestEstimations: null,
    tabularEstimationData: [],
    isLoading: false,
    error: null,
  },
}

export const geoSlice = createSlice({
  name: 'geo',
  initialState,
  reducers: {
    setMapAvailability: (state, { payload }: PayloadAction<boolean>) => {
      state.isMapAvailable = payload
    },
    applyMosaicOptions: (state) => {
      state.mosaicOptions.mosaicUrl = {}
      state.mosaicOptions.mosaicFailed = false
      state.mosaicOptions.mosaicPending = false
      state.mosaicOptions.applied = { ...state.mosaicOptions.ui }
    },
    toggleMosaicLayer: (state) => {
      if (!state.mosaicOptions.mosaicSelected) state.mosaicOptions.mosaicFailed = false // The user is retrying
      state.mosaicOptions.mosaicSelected = !state.mosaicOptions.mosaicSelected
    },
    toggleMosaicSource: (state, { payload }: PayloadAction<MosaicSource>) => {
      const i = state.mosaicOptions.ui.sources.findIndex((key) => key === payload)
      if (i === -1) {
        state.mosaicOptions.ui.sources.push(payload)
      } else {
        state.mosaicOptions.ui.sources.splice(i, 1)
      }
    },
    setMosaicYear: (state, { payload }: PayloadAction<number>) => {
      state.mosaicOptions.ui.year = payload
    },
    setMosaicMaxCloudCoverage: (state, { payload }: PayloadAction<number>) => {
      state.mosaicOptions.ui.maxCloudCoverage = payload
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
        delete state.forestOptions.failedLayers[payload] // In case the loading failed and it is manually re-tried
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
    setGlobalOpacity: (state, { payload }: PayloadAction<number>) => {
      state.forestOptions.selected.forEach((layerKey) => {
        state.forestOptions.opacity[layerKey] = payload
      })
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
    setAgreementPalette: (state, { payload }: PayloadAction<Array<string>>) => {
      state.forestOptions.agreementPalette = payload
    },
    resetAgreementPalette: (state) => {
      state.forestOptions.agreementPalette = initialState.forestOptions.agreementPalette
    },
    resetAgreementLayer: (state) => {
      state.forestOptions.agreementLayerSelected = initialState.forestOptions.agreementLayerSelected
      state.forestOptions.agreementLevel = initialState.forestOptions.agreementLevel
    },
    setAgreementLayerStatus: (state, { payload }: PayloadAction<LayerStatus>) => {
      state.forestOptions.agreementLayerStatus = payload
    },
    resetLayersStates: (state) => {
      state.forestOptions.fetchedLayers = initialState.forestOptions.fetchedLayers
      state.forestOptions.pendingLayers = initialState.forestOptions.pendingLayers
      state.forestOptions.failedLayers = initialState.forestOptions.failedLayers
    },
    resetSingleLayerStates: (state, { payload }: PayloadAction<ForestSource>) => {
      delete state.forestOptions.fetchedLayers[payload]
      delete state.forestOptions.pendingLayers[payload]
      delete state.forestOptions.failedLayers[payload]
    },
    setRecipe: (state, { payload }: PayloadAction<string>) => {
      // If the recipe is not custom, reset the failed layers so they are fetched again
      if (payload !== 'custom') state.forestOptions.failedLayers = initialState.forestOptions.failedLayers
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
    setCustomAssetId: (state, { payload }: PayloadAction<string>) => {
      state.forestOptions.customAssetId = payload
    },
    setForestEstimations: (state, { payload }: PayloadAction<ForestEstimations>) => {
      state.geoStatistics.forestEstimations = payload
      state.geoStatistics.isLoading = false
      state.geoStatistics.error = null
    },
    setTabularEstimationData: (state, { payload }: PayloadAction<[string, number, number][]>) => {
      state.geoStatistics.tabularEstimationData = payload
      state.geoStatistics.isLoading = false
      state.geoStatistics.error = null
    },
    setEstimationsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.geoStatistics.isLoading = payload
    },
    setEstimationsError: (state, { payload }: PayloadAction<string>) => {
      state.geoStatistics.error = payload
      state.geoStatistics.isLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postMosaicOptions.fulfilled, (state, { payload }) => {
        const { urlTemplate, countryIso } = payload
        state.mosaicOptions.mosaicUrl[countryIso] = urlTemplate
        state.mosaicOptions.mosaicFailed = false
        state.mosaicOptions.mosaicPending = false
      })
      .addCase(postMosaicOptions.pending, (state) => {
        state.mosaicOptions.mosaicPending = true
        state.mosaicOptions.mosaicFailed = false
        state.mosaicOptions.mosaicUrl = initialState.mosaicOptions.mosaicUrl
      })
      .addCase(postMosaicOptions.rejected, (state) => {
        state.mosaicOptions.mosaicFailed = true
        state.mosaicOptions.mosaicPending = false
        state.mosaicOptions.mosaicSelected = false
        state.mosaicOptions.mosaicUrl = initialState.mosaicOptions.mosaicUrl
      })
      .addCase(getForestLayer.fulfilled, (state, { payload: [key, mapId] }) => {
        state.forestOptions.fetchedLayers[key] = mapId
        delete state.forestOptions.pendingLayers[key]
        delete state.forestOptions.failedLayers[key]
      })
      .addCase(getForestLayer.pending, (state, { meta }) => {
        state.forestOptions.pendingLayers[meta.arg.key] = meta.arg.uri
        delete state.forestOptions.fetchedLayers[meta.arg.key]
        delete state.forestOptions.failedLayers[meta.arg.key]
      })
      .addCase(getForestLayer.rejected, (state, { meta }) => {
        state.forestOptions.failedLayers[meta.arg.key] = meta.arg.uri
        delete state.forestOptions.pendingLayers[meta.arg.key]
        delete state.forestOptions.fetchedLayers[meta.arg.key]
        // Un-select the layer if the fetching fails
        const i = state.forestOptions.selected.findIndex((key) => key === meta.arg.key)
        if (i !== -1) {
          state.forestOptions.selected.splice(i, 1)
        }
      })
      .addCase(getForestEstimationData.fulfilled, (state, { payload: forestEstimations }) => {
        state.geoStatistics.forestEstimations = forestEstimations
        state.geoStatistics.isLoading = false
        state.geoStatistics.error = null
      })
      .addCase(getForestEstimationData.pending, (state) => {
        state.geoStatistics.isLoading = true
        state.geoStatistics.error = null
      })
      .addCase(getForestEstimationData.rejected, (state, action) => {
        state.geoStatistics.isLoading = false
        state.geoStatistics.error = action.error ? (action.error.message as string) : 'Data Unavailable.'
      })
  },
})

export const GeoActions = {
  ...geoSlice.actions,
  postMosaicOptions,
}

export default geoSlice.reducer as Reducer<GeoState>

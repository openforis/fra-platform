import type { Draft, PayloadAction } from '@reduxjs/toolkit'
import { createSlice, Reducer } from '@reduxjs/toolkit'

import { ForestEstimations, LayerKey, LayerSectionKey, MapLayerKey, MosaicOptions, MosaicSource } from 'meta/geo'

import { mapController } from 'client/utils'

import { postMosaicOptions } from './actions/postMosaicOptions'
import { getForestEstimationData, postLayer, setLayerSectionRecipe, toggleLayer } from './actions'
import {
  AgreementLevelState,
  GeoState,
  LayerFetchStatus,
  LayersSectionState,
  LayerState,
  LayerStateOptions,
} from './stateType'

const initialMosaicOptions: MosaicOptions = {
  sources: ['landsat'],
  year: 2020,
  maxCloudCoverage: 30,
}

const initialState: GeoState = {
  sections: {} as Record<LayerSectionKey, LayersSectionState>,
  recipes: {} as Record<LayerSectionKey, string>,
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
  geoStatistics: {
    forestEstimations: null,
    tabularEstimationData: [],
    isLoading: false,
    error: null,
  },
}

const getSectionState = (state: Draft<GeoState>, sectionKey: LayerSectionKey): LayersSectionState => {
  // Default the states to an empty object if they don't exist yet
  state.sections[sectionKey] ??= {} as LayersSectionState
  return state.sections[sectionKey]
}

const getLayerState = (state: Draft<GeoState>, sectionKey: LayerSectionKey, layerKey: LayerKey): LayerState => {
  // Default the states to an empty object if they don't exist yet
  const sectionState = getSectionState(state, sectionKey)
  sectionState[layerKey] ??= {}
  return sectionState[layerKey]
}

const getLayerStateOptions = (
  state: Draft<GeoState>,
  sectionKey: LayerSectionKey,
  layerKey: LayerKey
): LayerStateOptions => {
  const layerState = getLayerState(state, sectionKey, layerKey)
  layerState.options ??= {}
  return layerState.options
}

const getAgreementOptionsState = (
  state: Draft<GeoState>,
  sectionKey: LayerSectionKey,
  layerKey: LayerKey
): AgreementLevelState => {
  const layerStateOptions = getLayerStateOptions(state, sectionKey, layerKey)
  layerStateOptions.agreementLayer ??= {} as AgreementLevelState
  return layerStateOptions.agreementLayer
}

const handlePostLayerStatus = (
  state: Draft<GeoState>,
  sectionKey: LayerSectionKey,
  layerKey: LayerKey,
  status: LayerFetchStatus,
  mapId = ''
): LayerState => {
  const layerState = getLayerState(state, sectionKey, layerKey)
  let newLayerState = { ...layerState, status, mapId }

  const mapLayerKey: MapLayerKey = `${sectionKey}-${layerKey}`

  switch (status) {
    case LayerFetchStatus.Ready:
      if (newLayerState.selected && mapId) {
        mapController.addEarthEngineLayer(mapLayerKey, mapId)
        mapController.setEarthEngineLayerOpacity(mapLayerKey, newLayerState.opacity ?? 1)
      }
      if (layerKey === 'Agreement') {
        const agreementOptionsState = getAgreementOptionsState(state, sectionKey, layerKey)
        newLayerState.options ??= {} as LayerStateOptions
        newLayerState.options.agreementLayer = agreementOptionsState
      }
      break
    case LayerFetchStatus.Loading:
      mapController.removeLayer(mapLayerKey)
      break
    case LayerFetchStatus.Failed:
      newLayerState = { ...newLayerState, selected: false }
      mapController.removeLayer(mapLayerKey)
      break
    default:
      return null
  }
  state.sections[sectionKey][layerKey] = newLayerState
  return newLayerState
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
    insertTabularEstimationEntry: (
      state,
      { payload: [index, entry] }: PayloadAction<[number, [string, number, number]]>
    ) => {
      let replaced = false
      state.geoStatistics.tabularEstimationData = state.geoStatistics.tabularEstimationData.map((row) => {
        let newRow: [string, number, number] = [...row]
        if (newRow[0] === entry[0]) {
          newRow = entry
          replaced = true
        }
        return newRow
      })
      if (!replaced) {
        state.geoStatistics.tabularEstimationData.splice(index, 0, entry)
      }
    },
    setLayerSelected: (
      state: Draft<GeoState>,
      action: PayloadAction<{ sectionKey: LayerSectionKey; layerKey: LayerKey; selected: boolean }>
    ) => {
      const { sectionKey, layerKey, selected } = action.payload
      const layerState = getLayerState(state, sectionKey, layerKey)

      // If the property is not defined, it means the layer has not been selected before,
      // so set selected and intialize the opacity
      const newLayerState =
        layerState.selected === undefined ? { ...layerState, selected, opacity: 1 } : { ...layerState, selected }

      state.sections[sectionKey][layerKey] = newLayerState

      // Render or remove layer from the map
      const { selected: isLayerSelected, mapId } = state.sections[sectionKey][layerKey]
      const mapLayerKey: MapLayerKey = `${sectionKey}-${layerKey}`
      if (isLayerSelected && mapId) {
        mapController.addEarthEngineLayer(mapLayerKey, mapId)
      } else {
        mapController.removeLayer(mapLayerKey)
      }
    },
    setLayerOptions: (
      state: Draft<GeoState>,
      action: PayloadAction<{ layerKey: LayerKey; options: LayerStateOptions; sectionKey: LayerSectionKey }>
    ) => {
      const { layerKey, options, sectionKey } = action.payload
      const layerState = getLayerState(state, sectionKey, layerKey)
      state.sections[sectionKey][layerKey] = { ...layerState, options: { ...options } }
    },
    setLayerOpacity: (
      state: Draft<GeoState>,
      action: PayloadAction<{ sectionKey: LayerSectionKey; layerKey: LayerKey; opacity: number }>
    ) => {
      const { sectionKey, layerKey, opacity } = action.payload
      const layerState = getLayerState(state, sectionKey, layerKey)
      state.sections[sectionKey][layerKey] = { ...layerState, opacity }
      const mapLayerKey: MapLayerKey = `${sectionKey}-${layerKey}`
      mapController.setEarthEngineLayerOpacity(mapLayerKey, opacity)
    },
    setAssetId: (
      state: Draft<GeoState>,
      action: PayloadAction<{ sectionKey: LayerSectionKey; layerKey: LayerKey; assetId: string }>
    ) => {
      const { sectionKey, layerKey, assetId } = action.payload
      const layerStateOptions = getLayerStateOptions(state, sectionKey, layerKey)
      state.sections[sectionKey][layerKey].options = { ...layerStateOptions, assetId }
    },
    setLayerGteTreeCoverPercent: (
      state: Draft<GeoState>,
      action: PayloadAction<{ sectionKey: LayerSectionKey; layerKey: LayerKey; gteTreeCoverPercent: number }>
    ) => {
      const { sectionKey, layerKey, gteTreeCoverPercent } = action.payload
      const layerStateOptions = getLayerStateOptions(state, sectionKey, layerKey)
      state.sections[sectionKey][layerKey].options = { ...layerStateOptions, gteTreeCoverPercent }
    },
    setLayerYear: (
      state: Draft<GeoState>,
      action: PayloadAction<{ sectionKey: LayerSectionKey; layerKey: LayerKey; year: number }>
    ) => {
      const { sectionKey, layerKey, year } = action.payload
      const layerStateOptions = getLayerStateOptions(state, sectionKey, layerKey)
      state.sections[sectionKey][layerKey].options = { ...layerStateOptions, year }
    },
    setAgreementLevel: (
      state: Draft<GeoState>,
      action: PayloadAction<{ sectionKey: LayerSectionKey; layerKey: LayerKey; level: number }>
    ) => {
      const { sectionKey, layerKey, level } = action.payload
      const agreementOptionsState = getAgreementOptionsState(state, sectionKey, layerKey)
      state.sections[sectionKey][layerKey].options.agreementLayer = { ...agreementOptionsState, level }
    },
    setAgreementReducerScale: (
      state,
      {
        payload: { sectionKey, layerKey, reducerScale },
      }: PayloadAction<{ sectionKey: LayerSectionKey; layerKey: LayerKey; reducerScale: number }>
    ) => {
      state.sections[sectionKey][layerKey].options.agreementLayer.reducerScale = reducerScale
    },
    setSectionGlobalOpacity: (
      state: Draft<GeoState>,
      action: PayloadAction<{ sectionKey: LayerSectionKey; opacity: number }>
    ) => {
      const { sectionKey, opacity } = action.payload

      // Safely get the object with the layer keys of the section
      const sectionState = getSectionState(state, sectionKey)

      Object.keys(sectionState).forEach((layerKey) => {
        if (layerKey === 'Agreement') return // Ignore any agreement layer

        const layerSelectState = state.sections[sectionKey][layerKey as LayerKey].selected
        if (layerSelectState === undefined || !layerSelectState) return // Ignore non-selected layers

        state.sections[sectionKey][layerKey as LayerKey].opacity = opacity
        const mapLayerKey: MapLayerKey = `${sectionKey}-${layerKey as LayerKey}`
        mapController.setEarthEngineLayerOpacity(mapLayerKey, opacity)
      })
    },
    resetLayerStatus: (
      state: Draft<GeoState>,
      action: PayloadAction<{ sectionKey: LayerSectionKey; layerKey: LayerKey }>
    ) => {
      const { sectionKey, layerKey } = action.payload
      const layerState = getLayerState(state, sectionKey, layerKey)
      state.sections[sectionKey][layerKey] = { ...layerState, status: LayerFetchStatus.Unfetched }
    },
    resetAllLayersStatus: (state) => {
      Object.keys(state.sections).forEach((sectionKey) => {
        Object.keys(state.sections[sectionKey as LayerSectionKey]).forEach((layerKey) => {
          state.sections[sectionKey as LayerSectionKey][layerKey as LayerKey].status = LayerFetchStatus.Unfetched
        })
      })
    },
    setLayerSectionRecipeName: (state, action: PayloadAction<{ recipe: string; sectionKey: LayerSectionKey }>) => {
      const { sectionKey, recipe } = action.payload
      state.recipes[sectionKey] = recipe
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
      .addCase(postLayer.fulfilled, (state, { payload: [sectionKey, layerKey, mapId] }) => {
        handlePostLayerStatus(state, sectionKey, layerKey, LayerFetchStatus.Ready, mapId)
      })
      .addCase(postLayer.pending, (state, { meta }) => {
        handlePostLayerStatus(state, meta.arg.sectionKey, meta.arg.layerKey, LayerFetchStatus.Loading)
      })
      .addCase(postLayer.rejected, (state, { meta }) => {
        handlePostLayerStatus(state, meta.arg.sectionKey, meta.arg.layerKey, LayerFetchStatus.Failed)
      })
  },
})

export const GeoActions = {
  ...geoSlice.actions,
  postMosaicOptions,
  postLayer,
  setLayerSectionRecipe,
  toggleLayer,
}

export default geoSlice.reducer as Reducer<GeoState>

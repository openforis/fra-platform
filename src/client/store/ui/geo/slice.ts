import type { Draft, PayloadAction } from '@reduxjs/toolkit'
import { createSlice, Reducer } from '@reduxjs/toolkit'

import { ForestEstimations, ForestKey, LayerKey, LayerSectionKey, MosaicOptions, MosaicSource } from '@meta/geo'

import { postMosaicOptions } from './actions/postMosaicOptions'
import { getForestEstimationData, postLayer } from './actions'
import { GeoState, LayerFetchStatus, LayersSectionState, LayerState } from './stateType'

const initialMosaicOptions: MosaicOptions = {
  sources: ['landsat'],
  year: 2020,
  maxCloudCoverage: 30,
}

const initialState: GeoState = {
  sections: {} as Record<LayerSectionKey, LayersSectionState>,
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
    toggleLayer: (
      state: Draft<GeoState>,
      action: PayloadAction<{ sectionKey: LayerSectionKey; layerKey: LayerKey }>
    ) => {
      const { sectionKey, layerKey } = action.payload
      const layerState = getLayerState(state, sectionKey, layerKey)

      let newLayerState = {}
      // If the property is not defined, it means the layer has not been selected before,
      // so toggle to selected and intialize the opacity
      if (layerState.selected === undefined) {
        newLayerState = { ...layerState, selected: true, opacity: 1 }
      } else {
        // Otherwise, toggle the previous state
        newLayerState = { ...layerState, selected: !layerState.selected }
      }
      state.sections[sectionKey][layerKey] = newLayerState
    },
    setLayerOpacity: (
      state: Draft<GeoState>,
      action: PayloadAction<{ sectionKey: LayerSectionKey; layerKey: LayerKey; opacity: number }>
    ) => {
      const { sectionKey, layerKey, opacity } = action.payload
      const layerState = getLayerState(state, sectionKey, layerKey)
      state.sections[sectionKey][layerKey] = { ...layerState, opacity }
    },
    setAssetId: (
      state: Draft<GeoState>,
      action: PayloadAction<{ sectionKey: LayerSectionKey; layerKey: LayerKey; assetId: string }>
    ) => {
      const { sectionKey, layerKey, assetId } = action.payload
      const layerState = getLayerState(state, sectionKey, layerKey)
      state.sections[sectionKey][layerKey] = { ...layerState, assetId }
    },
    setLayerMinTreeCoverPercentage: (
      state,
      {
        payload: { sectionKey, layerKey, minTreeCoverPercentage },
      }: PayloadAction<{ sectionKey: LayerSectionKey; layerKey: LayerKey; minTreeCoverPercentage: number }>
    ) => {
      state.sections[sectionKey][layerKey].options.minTreeCoverPercentage = minTreeCoverPercentage
    },
    setAgreementLevel: (
      state,
      {
        payload: { sectionKey, layerKey, level },
      }: PayloadAction<{ sectionKey: LayerSectionKey; layerKey: LayerKey; level: number }>
    ) => {
      state.sections[sectionKey][layerKey].options.agreementLayer.level = level
    },
    setAgreementReducerScale: (
      state,
      {
        payload: { sectionKey, layerKey, reducerScale },
      }: PayloadAction<{ sectionKey: LayerSectionKey; layerKey: LayerKey; reducerScale: number }>
    ) => {
      state.sections[sectionKey][layerKey].options.agreementLayer.reducerScale = reducerScale
    },
    setAgreementPalette: (
      state,
      {
        payload: { sectionKey, layerKey, palette },
      }: PayloadAction<{ sectionKey: LayerSectionKey; layerKey: LayerKey; palette: Array<string> }>
    ) => {
      state.sections[sectionKey][layerKey].options.agreementLayer.palette = palette
    },
    setSectionGlobalOpacity: (
      state: Draft<GeoState>,
      action: PayloadAction<{ sectionKey: LayerSectionKey; opacity: number }>
    ) => {
      const { sectionKey, opacity } = action.payload

      // Safely get the object with the layer keys of the section
      const sectionState = getSectionState(state, sectionKey)

      Object.keys(sectionState).forEach((layerKey) => {
        if (layerKey === ForestKey.Agreement) return // Ignore the agreement layer

        const layerSelectState = state.sections[sectionKey][layerKey as LayerKey].selected
        if (layerSelectState === undefined || !layerSelectState) return // Ignore non-selected layers

        state.sections[sectionKey][layerKey as LayerKey].opacity = opacity
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
        state.sections[sectionKey][layerKey].status = LayerFetchStatus.Ready
        state.sections[sectionKey][layerKey].mapId = mapId
      })
      .addCase(postLayer.pending, (state, { meta }) => {
        state.sections[meta.arg.sectionKey][meta.arg.layerKey].status = LayerFetchStatus.Loading
      })
      .addCase(postLayer.rejected, (state, { meta }) => {
        state.sections[meta.arg.sectionKey][meta.arg.layerKey].status = LayerFetchStatus.Failed
        state.sections[meta.arg.sectionKey][meta.arg.layerKey].selected = false
      })
  },
})

export const GeoActions = {
  ...geoSlice.actions,
  postMosaicOptions,
}

export default geoSlice.reducer as Reducer<GeoState>

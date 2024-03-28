import type { Draft, PayloadAction } from '@reduxjs/toolkit'
import { createSlice, Reducer } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import {
  ExtraEstimation,
  ForestEstimations,
  LayerKey,
  LayerSectionKey,
  MapLayerKey,
  MosaicOptions,
  MosaicSource,
} from 'meta/geo'
import {
  ExtraEstimationSectionState,
  ExtraEstimationState,
  GeoStatisticsExtraEstimations,
} from 'meta/geo/geoStatistics'

import {
  getForestEstimationData,
  postExtraEstimation,
  postLayer,
  setLayerOpacity,
  setLayerSectionRecipe,
  setSectionGlobalOpacity,
  toggleLayer,
} from 'client/store/ui/geo/actions'
import { postMosaicOptions } from 'client/store/ui/geo/actions/postMosaicOptions'
import { mapController } from 'client/utils'

import {
  AgreementLevelState,
  GeoState,
  LayerFetchStatus,
  LayersSectionState,
  LayerState,
  LayerStateOptions,
} from './stateType'
import { getAgreementLayerCacheKey } from './utils'

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
    applied: { ...initialMosaicOptions },
    ui: { ...initialMosaicOptions },
    url: {},
  },
  geoStatistics: {
    forestEstimations: null,
    tabularEstimationData: [],
    isLoading: false,
    error: null,
    extraEstimations: {} as GeoStatisticsExtraEstimations,
  },
}

const getExtraEstimationState = (
  state: Draft<GeoState>,
  sectionKey: LayerSectionKey,
  extraEstimation: ExtraEstimation
): ExtraEstimationState => {
  state.geoStatistics.extraEstimations[sectionKey] ??= {} as ExtraEstimationSectionState
  state.geoStatistics.extraEstimations[sectionKey][extraEstimation] ??= {
    errorKey: null,
    isLoading: false,
  }

  return state.geoStatistics.extraEstimations[sectionKey][extraEstimation]
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

const setMapIdCache = (state: Draft<GeoState>, sectionKey: LayerSectionKey, layerKey: LayerKey, mapId: string) => {
  const layerState = getLayerState(state, sectionKey, layerKey)
  const layerOptions = getLayerStateOptions(state, sectionKey, layerKey)

  if (Objects.isEmpty(layerOptions) || layerOptions.assetId !== undefined) return

  if (Objects.isEmpty(layerState.cache)) layerState.cache = {}
  const { agreementLayer, year, gteTreeCoverPercent } = layerOptions
  switch (true) {
    case agreementLayer?.level !== undefined: {
      const sectionState = getSectionState(state, sectionKey)
      const agreementLayerCacheKey = getAgreementLayerCacheKey(sectionState)
      layerState.cache[agreementLayerCacheKey] = mapId
      break
    }
    case year !== undefined:
      layerState.cache[year] = mapId
      break
    case gteTreeCoverPercent !== undefined:
      layerState.cache[gteTreeCoverPercent] = mapId
      break
    default:
      break
  }
}

const handlePostLayerStatus = (
  state: Draft<GeoState>,
  sectionKey: LayerSectionKey,
  layerKey: LayerKey,
  status: LayerFetchStatus,
  mapId: string | null = null
): LayerState => {
  const layerState = getLayerState(state, sectionKey, layerKey)
  let newLayerState = { status, mapId } as LayerState

  const mapLayerKey: MapLayerKey = `${sectionKey}-${layerKey}`

  switch (status) {
    case LayerFetchStatus.Ready:
      if (mapId) {
        setMapIdCache(state, sectionKey, layerKey, mapId)
        const opacity = layerState.opacity ?? 1
        if (layerState.selected) {
          mapController.addOrUpdateEarthEngineLayer(mapLayerKey, mapId, opacity)
        } else {
          mapController.removeLayer(mapLayerKey)
        }
      }
      break
    case LayerFetchStatus.Loading:
      mapController.removeLayer(mapLayerKey)
      break
    case LayerFetchStatus.Failed:
      if (layerState.options?.assetId) newLayerState = { ...newLayerState, selected: false }
      mapController.removeLayer(mapLayerKey)
      break
    default:
      return null
  }
  state.sections[sectionKey][layerKey] = { ...state.sections[sectionKey][layerKey], ...newLayerState }
  return state.sections[sectionKey][layerKey]
}

export const geoSlice = createSlice({
  name: 'geo',
  initialState,
  reducers: {
    setMapAvailability: (state, { payload }: PayloadAction<boolean>) => {
      state.isMapAvailable = payload
    },
    applyMosaicOptions: (state) => {
      state.mosaicOptions.url = {}
      state.mosaicOptions.status = LayerFetchStatus.Unfetched
      state.mosaicOptions.applied = { ...state.mosaicOptions.ui }
    },
    toggleMosaicLayer: (state) => {
      const currentSelected = state.mosaicOptions.selected ?? false
      state.mosaicOptions.selected = !currentSelected
      if (currentSelected) mapController.removeLayer('mosaic')
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
    setTabularEstimationData: (state, { payload }: PayloadAction<[string, number, number, string][]>) => {
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
      { payload: [index, entry] }: PayloadAction<[number, [string, number, number, string]]>
    ) => {
      let replaced = false
      state.geoStatistics.tabularEstimationData = state.geoStatistics.tabularEstimationData.map((row) => {
        let newRow: [string, number, number, string] = [...row]
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
      const opacity = newLayerState.opacity ?? 1
      if (isLayerSelected) {
        mapController.addOrUpdateEarthEngineLayer(mapLayerKey, mapId, opacity)
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
    setLayerOpacityValue: (
      state: Draft<GeoState>,
      action: PayloadAction<{ sectionKey: LayerSectionKey; layerKey: LayerKey; opacity: number }>
    ) => {
      const { sectionKey, layerKey, opacity } = action.payload
      const layerState = getLayerState(state, sectionKey, layerKey)
      state.sections[sectionKey][layerKey] = { ...layerState, opacity }
      const mapLayerKey: MapLayerKey = `${sectionKey}-${layerKey}`
      const { mapId } = state.sections[sectionKey][layerKey]

      mapController.addOrUpdateEarthEngineLayer(mapLayerKey, mapId, opacity)
    },
    setLayerMapId: (
      state: Draft<GeoState>,
      action: PayloadAction<{
        sectionKey: LayerSectionKey
        layerKey: LayerKey
        mapId: string | null
        drawLayer?: boolean
      }>
    ) => {
      const { sectionKey, layerKey, mapId, drawLayer = true } = action.payload
      const layerState = getLayerState(state, sectionKey, layerKey)
      state.sections[sectionKey][layerKey] = { ...layerState, mapId }

      if (!drawLayer || mapId === null) return

      const mapLayerKey: MapLayerKey = `${sectionKey}-${layerKey}`
      mapController.removeLayer(mapLayerKey)
      const opacity = layerState.opacity ?? 0
      mapController.addOrUpdateEarthEngineLayer(mapLayerKey, mapId, opacity)
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
          state.sections[sectionKey as LayerSectionKey][layerKey as LayerKey].cache = undefined
          state.sections[sectionKey as LayerSectionKey][layerKey as LayerKey].mapId = null
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
        state.mosaicOptions.url[countryIso] = urlTemplate
        state.mosaicOptions.status = LayerFetchStatus.Ready
      })
      .addCase(postMosaicOptions.pending, (state) => {
        state.mosaicOptions.url = initialState.mosaicOptions.url
        state.mosaicOptions.status = LayerFetchStatus.Loading
        mapController.removeLayer('mosaic')
      })
      .addCase(postMosaicOptions.rejected, (state) => {
        state.mosaicOptions.url = initialState.mosaicOptions.url
        state.mosaicOptions.status = LayerFetchStatus.Failed
        mapController.removeLayer('mosaic')
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
      .addCase(postExtraEstimation.fulfilled, (state, { payload: [extraEstimation, sectionKey, _scale] }) => {
        getExtraEstimationState(state, sectionKey, extraEstimation)
        state.geoStatistics.extraEstimations[sectionKey][extraEstimation] = {
          errorKey: null,
          isLoading: false,
        }
      })
      .addCase(postExtraEstimation.pending, (state, { meta }) => {
        getExtraEstimationState(state, meta.arg.sectionKey, meta.arg.extraEstimation)
        state.geoStatistics.extraEstimations[meta.arg.sectionKey][meta.arg.extraEstimation] = {
          errorKey: null,
          isLoading: true,
        }
      })
      .addCase(postExtraEstimation.rejected, (state, action) => {
        const { sectionKey, extraEstimation } = action.meta.arg
        getExtraEstimationState(state, sectionKey, extraEstimation)
        state.geoStatistics.extraEstimations[sectionKey][extraEstimation] = {
          errorKey: action.payload as string,
          isLoading: false,
        }
      })
  },
})

export const GeoActions = {
  postExtraEstimation,
  postLayer,
  postMosaicOptions,
  setLayerOpacity,
  setLayerSectionRecipe,
  setSectionGlobalOpacity,
  toggleLayer,
  ...geoSlice.actions,
}

export default geoSlice.reducer as Reducer<GeoState>

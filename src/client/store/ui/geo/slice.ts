import type { Draft, PayloadAction } from '@reduxjs/toolkit'
import { createSlice, Reducer } from '@reduxjs/toolkit'

import { ExtraEstimation, ForestEstimations, LayerSectionKey } from 'meta/geo'
import {
  ExtraEstimationSectionState,
  ExtraEstimationState,
  ForestEstimationEntry,
  GeoStatisticsExtraEstimations,
} from 'meta/geo/geoStatistics'

import { getForestEstimationData, postExtraEstimation } from 'client/store/ui/geo/actions'

import { GeoState } from './stateType'

const initialState: GeoState = {
  geoStatistics: {
    forestEstimations: null,
    tabularForestEstimations: [],
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

export const geoSlice = createSlice({
  name: 'geo',
  initialState,
  reducers: {
    setForestEstimations: (state, { payload }: PayloadAction<ForestEstimations>) => {
      state.geoStatistics.forestEstimations = payload
      state.geoStatistics.isLoading = false
      state.geoStatistics.error = null
    },
    setTabularForestEstimations: (state, { payload }: PayloadAction<Array<ForestEstimationEntry>>) => {
      state.geoStatistics.tabularForestEstimations = payload
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
      { payload: [index, entry] }: PayloadAction<[number, ForestEstimationEntry]>
    ) => {
      const existingIndex = state.geoStatistics.tabularForestEstimations.findIndex(
        (row) => row.sourceKey === entry.sourceKey
      )
      if (existingIndex !== -1) {
        state.geoStatistics.tabularForestEstimations[existingIndex] = entry
      } else {
        state.geoStatistics.tabularForestEstimations.splice(index, 0, entry)
      }
    },
  },
  extraReducers: (builder) => {
    builder
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
        const { extraEstimation, sectionKey } = action.meta.arg
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
  ...geoSlice.actions,
}

export default geoSlice.reducer as Reducer<GeoState>

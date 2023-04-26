import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, Reducer } from '@reduxjs/toolkit'

import { ForestEstimations, MosaicOptions, MosaicSource } from 'meta/geo'

import { postMosaicOptions } from './actions/postMosaicOptions'
import { getForestEstimationData } from './actions'
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
  },
})

export const GeoActions = {
  ...geoSlice.actions,
  postMosaicOptions,
}

export default geoSlice.reducer as Reducer<GeoState>

/* eslint-disable no-param-reassign */
import { Country, CountryIso, Region, RegionGroup } from '@core/country'

import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit'
import { AssessmentType } from '@core/assessment'
import { AppState } from '@webapp/store/app/AppStateType'
import { initApp, switchLanguage } from './actions'

const initialState: AppState = {
  loaded: false,
  language: 'en',
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateCountries: (state, action: PayloadAction<Array<Country>>) => {
      state.countries = action.payload
    },

    updateRegions: (state, action: PayloadAction<Array<Region>>) => {
      state.regions = action.payload
    },

    updateRegionGroups: (state, action: PayloadAction<Array<RegionGroup>>) => {
      state.regionGroups = action.payload
    },

    updateCountryIso: (
      state,
      action: PayloadAction<{
        countryIso: CountryIso
        assessmentType: AssessmentType
        printView: boolean
        printOnlyTablesView?: boolean
      }>
    ) => {
      const { countryIso, assessmentType, printView, printOnlyTablesView } = action.payload
      state.countryIso = countryIso
      state.assessmentType = assessmentType
      if (printView) {
        state.printView = {
          onlyTables: printOnlyTablesView,
        }
      }
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(initApp.fulfilled, (state, { payload }) => {
        state.countries = payload.countries
        state.regions = payload.regions
        state.regionGroups = payload.regionGroups
        state.loaded = true

        state.language = payload.language
      })
      .addCase(initApp.rejected, (state, { payload }) => {
        state.loaded = true
        state.language = payload.language
      })
    builder.addCase(switchLanguage.fulfilled, (state, { payload }) => {
      state.language = payload.language
    })
  },
})

export const AppActions = {
  ...appSlice.actions,
  initApp,
  switchLanguage,
}

export default appSlice.reducer as Reducer<AppState>

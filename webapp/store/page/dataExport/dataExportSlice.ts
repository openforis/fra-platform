/* eslint-disable no-param-reassign */

import { createSlice, Reducer } from '@reduxjs/toolkit'

import { AppActions } from '@webapp/store/app'
import { HomeActionType } from '@webapp/store/page/home'
import { DataExportSelection, DataExportState } from './dataExportStateType'
import { DataExportCountriesAction, DataExportSelectionAction } from './actionTypes'

const initialState: DataExportState = {
  countries: [],
  selection: {},
}

export const dataExportSlice = createSlice({
  name: 'dataExport',
  initialState,
  reducers: {
    updateCountries: (state: DataExportState, action: DataExportCountriesAction) => {
      state.countries = action.payload
    },

    updateSelection: (state: DataExportState, { payload }: { payload: DataExportSelectionAction }) => {
      state.selection[payload.assessmentSection] = payload.selection
    },

    // reset countries when filtered countries in home changes
    [HomeActionType.countriesFilterUpdate]: (state: DataExportState) => {
      state.countries = []
      state.selection = Object.entries(state.selection).reduce<Record<string, DataExportSelection>>(
        (accumulator, [section, sectionSelection]) => {
          return {
            ...accumulator,
            [section]: {
              ...sectionSelection,
              countryISOs: [],
            },
          }
        },
        {}
      )
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AppActions.updateCountryIso, () => initialState)
    // TODO: When page.Home is created
    // builder.addCase(HomeActions.countriesFilterUpdate)....
  },
})

export const DataExportActions = {
  ...dataExportSlice.actions,
}

export default dataExportSlice.reducer as Reducer<DataExportState>

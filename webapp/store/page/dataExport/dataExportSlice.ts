import { createSlice, Reducer } from '@reduxjs/toolkit'

import { AppActions } from '@webapp/store/app'
import { HomeActions } from '@webapp/store/page/home'

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
  },
  extraReducers: (builder) => {
    builder.addCase(AppActions.updateCountryIso, () => initialState)
    builder.addCase(HomeActions.updateCountriesFilter, (state) => {
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
    })
  },
})

export const DataExportActions = {
  ...dataExportSlice.actions,
}

export default dataExportSlice.reducer as Reducer<DataExportState>

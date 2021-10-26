import { createSlice, Reducer, SliceCaseReducers } from '@reduxjs/toolkit'

import { AppActions } from '@webapp/store/app'
import { HomeActions } from '@webapp/store/page/home'

import { DataExportState } from './dataExportStateType'
import { DataExportCountriesAction, DataExportSelectionAction } from './actionTypes'

const initialState: DataExportState = {
  countries: [],
  selection: {
    countryISOs: [],
    variable: '',
    columns: [],
  },
}

export const dataExportSlice = createSlice<DataExportState, SliceCaseReducers<DataExportState>>({
  name: 'dataExport',
  initialState,
  reducers: {
    updateCountries: (state: DataExportState, action: DataExportCountriesAction) => {
      state.countries = action.payload
    },

    updateSelection: (state: DataExportState, { payload }: { payload: DataExportSelectionAction }) => {
      state.selection = payload.selection
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AppActions.updateCountryIso, () => initialState)
    builder.addCase(HomeActions.updateCountriesFilter, (state) => {
      state.countries = []
      state.selection.countryISOs = []
    })
  },
})

export const DataExportActions = {
  ...dataExportSlice.actions,
}

export default dataExportSlice.reducer as Reducer<DataExportState>

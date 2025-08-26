import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit'

import { resetReducer } from 'client/store/dataExport/slice/extraReducers/resetReducer'
import { updateCountriesReducer } from 'client/store/dataExport/slice/extraReducers/updateCountriesReducer'
import { updateSelectionReducer } from 'client/store/dataExport/slice/extraReducers/updateSelectionReducer'
import { DataExportState, initialState } from 'client/store/dataExport/state'

import { DataExportSliceName } from './name'

export const DataExportSlice = createSlice({
  name: DataExportSliceName,
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<DataExportState>) => {
    resetReducer(builder)
    updateCountriesReducer(builder)
    updateSelectionReducer(builder)
  },
  // extraReducers: (builder) => {
  //   builder.addCase(AppActions.updateCountryIso, () => initialState)
  //   builder.addCase(HomeActions.updateCountriesFilter, (state) => {
  //     state.countries = []
  //     state.selection = Object.entries(state.selection).reduce<Record<string, DataExportSelection>>(
  //       (accumulator, [section, sectionSelection]) => {
  //         return {
  //           ...accumulator,
  //           [section]: {
  //             ...sectionSelection,
  //             countryISOs: [],
  //           },
  //         }
  //       },
  //       {}
  //     )
  //   })
  // },
})

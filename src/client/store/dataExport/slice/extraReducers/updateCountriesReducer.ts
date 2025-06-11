import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { updateCountries } from 'client/store/dataExport/actions/updateCountries'
import { DataExportState } from 'client/store/dataExport/state'

export const updateCountriesReducer = (builder: ActionReducerMapBuilder<DataExportState>) => {
  builder.addCase(updateCountries, (state, action) => {
    state.countries = action.payload
  })
}

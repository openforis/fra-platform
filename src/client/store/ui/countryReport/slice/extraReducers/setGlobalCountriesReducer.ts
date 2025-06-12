import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { setGlobalCountries } from 'client/store/ui/countryReport/actions/setGlobalCountries'
import { CountryReportState } from 'client/store/ui/countryReport/state'

export const setGlobalCountriesReducer = (builder: ActionReducerMapBuilder<CountryReportState>) => {
  builder.addCase(setGlobalCountries, (state, action) => {
    const { payload } = action
    state.globalCountries = payload
  })
}

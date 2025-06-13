import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { setNavigationVisible } from 'client/store/ui/countryReport/actions/setNavigationVisible'
import { CountryReportState } from 'client/store/ui/countryReport/state'

export const navigationReducer = (builder: ActionReducerMapBuilder<CountryReportState>): void => {
  builder.addCase(setNavigationVisible, (state, action) => {
    state.navigationVisible = action.payload ?? !state.navigationVisible
  })
}

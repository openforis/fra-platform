import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { toggleDataLock } from 'client/store/ui/countryReport/actions/toggleDataLock'
import { CountryReportState } from 'client/store/ui/countryReport/state'

export const toggleDataLockReducer = (builder: ActionReducerMapBuilder<CountryReportState>) => {
  builder.addCase(toggleDataLock, (state) => {
    state.locked = !state.locked
  })
}

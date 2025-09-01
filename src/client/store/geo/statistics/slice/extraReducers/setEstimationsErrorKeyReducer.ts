import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { setEstimationsErrorKey } from 'client/store/geo/statistics/actions/setEstimationsErrorKey'
import { GeoStatisticsState } from 'client/store/geo/statistics/state'

export const setEstimationsErrorKeyReducer = (builder: ActionReducerMapBuilder<GeoStatisticsState>): void => {
  builder.addCase(setEstimationsErrorKey, (state, action) => {
    const { errorKey } = action.payload
    state.errorKey = errorKey
  })
}

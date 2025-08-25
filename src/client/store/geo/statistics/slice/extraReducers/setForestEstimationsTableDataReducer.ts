import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { setForestEstimationsTableData } from 'client/store/geo/statistics/actions/setForestEstimationsTableData'
import { GeoStatisticsState } from 'client/store/geo/statistics/state'

export const setForestEstimationsTableDataReducer = (builder: ActionReducerMapBuilder<GeoStatisticsState>): void => {
  builder.addCase(setForestEstimationsTableData, (state, action) => {
    const { forestEstimationsTableData } = action.payload
    state.forestEstimationsTableData = forestEstimationsTableData
    state.loading = false
    state.errorKey = null
  })
}

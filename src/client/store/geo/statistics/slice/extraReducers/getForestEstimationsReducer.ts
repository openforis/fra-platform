import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { getForestEstimations } from 'client/store/geo/statistics/actions/getForestEstimations'
import { GeoStatisticsState } from 'client/store/geo/statistics/state'

export const getForestEstimationsReducer = (builder: ActionReducerMapBuilder<GeoStatisticsState>): void => {
  builder.addCase(getForestEstimations.fulfilled, (state, action) => {
    const forestEstimations = action.payload
    Objects.setInPath({ obj: state, path: ['forestEstimations'], value: forestEstimations })
    Objects.setInPath({ obj: state, path: ['loading'], value: false })
    Objects.setInPath({ obj: state, path: ['errorKey'], value: null })
  })
  builder.addCase(getForestEstimations.pending, (state) => {
    Objects.setInPath({ obj: state, path: ['loading'], value: true })
    Objects.setInPath({ obj: state, path: ['errorKey'], value: null })
  })
  builder.addCase(getForestEstimations.rejected, (state, action) => {
    const errorKey = action.error ? action.error.message : 'geo.error.statistics.dataUnavailable'
    Objects.setInPath({ obj: state, path: ['loading'], value: false })
    Objects.setInPath({ obj: state, path: ['errorKey'], value: errorKey })
  })
}

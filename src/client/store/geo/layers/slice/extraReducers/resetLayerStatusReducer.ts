import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { resetLayerStatus } from 'client/store/geo/layers/actions/resetLayerStatus'
import { GeoLayersState, LayerFetchStatus } from 'client/store/geo/layers/state'

export const resetLayerStatusReducer = (builder: ActionReducerMapBuilder<GeoLayersState>): void => {
  builder.addCase(resetLayerStatus, (state, action) => {
    const { layerKey } = action.payload
    Objects.setInPath({ obj: state, path: [layerKey, 'status'], value: LayerFetchStatus.Unfetched })
    Objects.setInPath({ obj: state, path: [layerKey, 'cache'], value: undefined })
    Objects.setInPath({ obj: state, path: [layerKey, 'mapId'], value: null })
  })
}

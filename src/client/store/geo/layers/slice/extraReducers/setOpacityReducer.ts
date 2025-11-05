import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { setOpacity } from 'client/store/geo/layers/actions/setOpacity'
import { GeoLayersState } from 'client/store/geo/layers/state'
import { mapController } from 'client/geo/mapController'

export const setOpacityReducer = (builder: ActionReducerMapBuilder<GeoLayersState>): void => {
  builder.addCase(setOpacity.fulfilled, (state, action) => {
    const { layerKey, opacity } = action.payload

    Objects.setInPath({ obj: state, path: [layerKey, 'opacity'], value: opacity })

    mapController.addOrUpdateEarthEngineLayer(layerKey, state[layerKey]?.mapId, opacity)
  })
}

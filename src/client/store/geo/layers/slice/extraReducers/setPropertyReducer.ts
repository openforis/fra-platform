import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { setProperty } from 'client/store/geo/layers/actions/setProperty'
import { LayersState } from 'client/store/geo/layers/state'
import { mapController } from 'client/utils'

export const setPropertyReducer = (builder: ActionReducerMapBuilder<LayersState>) => {
  builder.addCase(setProperty, (state, action) => {
    const { key, layerKey, value } = action.payload

    Objects.setInPath({ obj: state, path: [layerKey, key], value })

    if (key === 'mapId' && value !== null) {
      mapController.removeLayer(layerKey)
      const opacity = state[layerKey]?.opacity ?? 0
      mapController.addOrUpdateEarthEngineLayer(layerKey, value, opacity)
    }
  })
}

import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { UN_BOUNDARIES_LAYER_KEY } from 'meta/geo/boundaries/layerKey'
import { Objects } from 'utils/objects'

import { setShowUnBoundaries } from 'client/store/geo/boundaries/actions/setShowUnBoundaries'
import { GeoBoundariesState } from 'client/store/geo/boundaries/state'
import { mapController } from 'client/geo/mapController'

export const setShowUnBoundariesReducer = (builder: ActionReducerMapBuilder<GeoBoundariesState>): void => {
  builder.addCase(setShowUnBoundaries, (state, { payload }) => {
    const { show } = payload
    Objects.setInPath({ obj: state, path: ['showUnBoundaries'], value: show })
    if (show) {
      mapController.addOrUpdateEarthEngineLayer(UN_BOUNDARIES_LAYER_KEY, 1, state.tileUrl)
    } else {
      mapController.removeLayer(UN_BOUNDARIES_LAYER_KEY)
    }
  })
}

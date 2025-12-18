import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { UN_BOUNDARIES_LAYER_KEY } from 'meta/geo/boundaries/layerKey'
import { Objects } from 'utils/objects'

import { getUnBoundariesLayer } from 'client/store/geo/boundaries/actions/getUnBoundariesLayer'
import { GeoBoundariesState } from 'client/store/geo/boundaries/state'
import { LayerFetchStatus } from 'client/store/geo/layers/state'
import { mapController } from 'client/geo/mapController'

export const getUnBoundariesLayerReducer = (builder: ActionReducerMapBuilder<GeoBoundariesState>): void => {
  builder.addCase(getUnBoundariesLayer.pending, (state) => {
    state.status = LayerFetchStatus.Loading
  })

  builder.addCase(getUnBoundariesLayer.fulfilled, (state, { payload }) => {
    const { tileUrl } = payload
    Objects.setInPath({ obj: state, path: ['tileUrl'], value: tileUrl })
    Objects.setInPath({ obj: state, path: ['status'], value: LayerFetchStatus.Ready })

    mapController.removeLayer(UN_BOUNDARIES_LAYER_KEY)
    if (state.showUnBoundaries) {
      mapController.addOrUpdateEarthEngineLayer(UN_BOUNDARIES_LAYER_KEY, 1, tileUrl)
    }
  })

  builder.addCase(getUnBoundariesLayer.rejected, (state) => {
    state.status = LayerFetchStatus.Failed
  })
}

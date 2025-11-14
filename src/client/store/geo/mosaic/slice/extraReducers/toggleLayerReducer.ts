import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { MOSAIC_LAYER_KEY } from 'meta/geo/mosaic/layerKey'

import { toggleLayer } from 'client/store/geo/mosaic/actions/toggleLayer'
import { GeoMosaicState } from 'client/store/geo/mosaic/state'
import { mapController } from 'client/geo/mapController'

export const toggleLayerReducer = (builder: ActionReducerMapBuilder<GeoMosaicState>): void => {
  builder.addCase(toggleLayer.fulfilled, (state, action) => {
    const { selected } = action.payload
    state.selected = selected

    if (!selected) {
      mapController.removeLayer(MOSAIC_LAYER_KEY)
      return
    }

    const url = state.urlTemplateData?.url
    if (!Objects.isEmpty(url)) mapController.addSepalLayer(MOSAIC_LAYER_KEY, url)
  })
}

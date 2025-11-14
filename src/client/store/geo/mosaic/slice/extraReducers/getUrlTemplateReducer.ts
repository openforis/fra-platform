import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { MOSAIC_LAYER_KEY } from 'meta/geo/mosaic/layerKey'

import { LayerFetchStatus } from 'client/store/geo/layers/state'
import { getUrlTemplate } from 'client/store/geo/mosaic/actions/getUrlTemplate'
import { GeoMosaicState } from 'client/store/geo/mosaic/state'
import { mapController } from 'client/geo/mapController'

export const getUrlTemplateReducer = (builder: ActionReducerMapBuilder<GeoMosaicState>): void => {
  builder.addCase(getUrlTemplate.pending, (state) => {
    delete state.urlTemplateData
    state.status = LayerFetchStatus.Loading
    mapController.removeLayer(MOSAIC_LAYER_KEY)
  })

  builder.addCase(getUrlTemplate.rejected, (state) => {
    delete state.urlTemplateData
    state.status = LayerFetchStatus.Failed
    mapController.removeLayer(MOSAIC_LAYER_KEY)
  })

  builder.addCase(getUrlTemplate.fulfilled, (state, action) => {
    state.urlTemplateData = action.payload
    state.status = LayerFetchStatus.Ready

    if (state.selected) {
      mapController.addSepalLayer(MOSAIC_LAYER_KEY, state.urlTemplateData.url)
    } else {
      mapController.removeLayer(MOSAIC_LAYER_KEY)
    }
  })
}

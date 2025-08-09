import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { MOSAIC_LAYER_KEY } from 'meta/geo/mosaic'

import { getUrlTemplate } from 'client/store/geo/mosaic/actions/getUrlTemplate'
import { MosaicState } from 'client/store/geo/mosaic/state'
import { LayerFetchStatus } from 'client/store/ui/geo/stateType'
import { mapController } from 'client/utils'

export const getUrlTemplateReducer = (builder: ActionReducerMapBuilder<MosaicState>) => {
  builder.addCase(getUrlTemplate.pending, (state) => {
    delete state.urlTemplate
    state.status = LayerFetchStatus.Loading
    mapController.removeLayer(MOSAIC_LAYER_KEY)
  })

  builder.addCase(getUrlTemplate.rejected, (state) => {
    delete state.urlTemplate
    state.status = LayerFetchStatus.Failed
    mapController.removeLayer(MOSAIC_LAYER_KEY)
  })

  builder.addCase(getUrlTemplate.fulfilled, (state, action) => {
    const urlTemplate = action.payload
    state.urlTemplate = urlTemplate
    state.status = LayerFetchStatus.Ready

    if (state.selected) {
      mapController.addSepalLayer(MOSAIC_LAYER_KEY, urlTemplate)
    } else {
      mapController.removeLayer(MOSAIC_LAYER_KEY)
    }
  })
}

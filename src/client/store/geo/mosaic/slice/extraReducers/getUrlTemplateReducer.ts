import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { MOSAIC_LAYER_KEY } from 'meta/geo/mosaic'

import { getUrlTemplate } from 'client/store/geo/mosaic/actions/getUrlTemplate'
import { MosaicState } from 'client/store/geo/mosaic/state'
import { LayerFetchStatus } from 'client/store/ui/geo/stateType'
import { mapController } from 'client/utils'

export const getUrlTemplateReducer = (builder: ActionReducerMapBuilder<MosaicState>) => {
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

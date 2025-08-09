import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { MOSAIC_LAYER_KEY } from 'meta/geo/mosaic'

import { getUrlTemplate } from 'client/store/geo/mosaic/actions/getUrlTemplate'
import { initialState, MosaicState } from 'client/store/geo/mosaic/state'
import { LayerFetchStatus } from 'client/store/ui/geo/stateType'
import { mapController } from 'client/utils'

export const getUrlTemplateReducer = (builder: ActionReducerMapBuilder<MosaicState>) => {
  builder.addCase(getUrlTemplate.pending, (state) => {
    state.url = initialState.url
    state.status = LayerFetchStatus.Loading
    mapController.removeLayer(MOSAIC_LAYER_KEY)
  })

  builder.addCase(getUrlTemplate.rejected, (state) => {
    state.url = initialState.url
    state.status = LayerFetchStatus.Failed
    mapController.removeLayer(MOSAIC_LAYER_KEY)
  })

  builder.addCase(getUrlTemplate.fulfilled, (state, action) => {
    const { countryIso, urlTemplate } = action.payload
    state.url[countryIso] = urlTemplate
    state.status = LayerFetchStatus.Ready
  })
}

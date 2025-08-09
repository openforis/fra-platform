import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { MOSAIC_LAYER_KEY } from 'meta/geo/mosaic'

import { toggleLayer } from 'client/store/geo/mosaic/actions/toggleLayer'
import { MosaicState } from 'client/store/geo/mosaic/state'
import { mapController } from 'client/utils'

export const toggleLayerReducer = (builder: ActionReducerMapBuilder<MosaicState>) => {
  builder.addCase(toggleLayer, (state) => {
    const currentSelected = state.selected ?? false
    state.selected = !currentSelected
    if (currentSelected) mapController.removeLayer(MOSAIC_LAYER_KEY)
  })
}

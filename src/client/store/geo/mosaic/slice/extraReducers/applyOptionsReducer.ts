import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { applyOptions } from 'client/store/geo/mosaic/actions/applyOptions'
import { MosaicState } from 'client/store/geo/mosaic/state'
import { LayerFetchStatus } from 'client/store/ui/geo/stateType'

export const applyOptionsReducer = (builder: ActionReducerMapBuilder<MosaicState>) => {
  builder.addCase(applyOptions, (state) => {
    state.options = { ...state.ui }
    state.status = LayerFetchStatus.Unfetched
    state.url = {}
  })
}

import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { setOptions } from 'client/store/geo/mosaic/actions/setOptions'
import { MosaicState } from 'client/store/geo/mosaic/state'

export const setOptionsReducer = (builder: ActionReducerMapBuilder<MosaicState>) => {
  builder.addCase(setOptions, (state, action) => {
    const { datum } = action.payload
    state.options = { ...state.options, ...datum }
  })
}

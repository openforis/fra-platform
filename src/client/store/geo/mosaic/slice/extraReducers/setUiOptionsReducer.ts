import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { setUiOptions } from 'client/store/geo/mosaic/actions/setUiOptions'
import { MosaicState } from 'client/store/geo/mosaic/state'

export const setUiOptionsReducer = (builder: ActionReducerMapBuilder<MosaicState>) => {
  builder.addCase(setUiOptions, (state, action) => {
    const { datum } = action.payload
    const newUiOptions = {
      ...state.ui,
      ...datum,
      sources: {
        ...state.ui?.sources,
        ...datum.sources,
      },
    }
    state.ui = newUiOptions
  })
}

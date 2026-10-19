import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { Objects } from 'utils/objects'

import { setOption } from 'client/store/geo/mosaic/actions/setOption'
import { GeoMosaicState } from 'client/store/geo/mosaic/state'

export const setOptionReducer = (builder: ActionReducerMapBuilder<GeoMosaicState>): void => {
  builder.addCase(setOption, (state, action) => {
    const { key, value } = action.payload

    if (key === 'sources') {
      state.options.sources = value
      return
    }

    Objects.setInPath({ obj: state, path: ['options', key], value })
  })
}

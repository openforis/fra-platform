import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { setOption } from 'client/store/geo/mosaic/actions/setOption'
import { MosaicState } from 'client/store/geo/mosaic/state'

export const setOptionReducer = (builder: ActionReducerMapBuilder<MosaicState>) => {
  builder.addCase(setOption, (state, action) => {
    const { key, value } = action.payload

    Objects.setInPath({ obj: state, path: ['options', key], value })
  })
}

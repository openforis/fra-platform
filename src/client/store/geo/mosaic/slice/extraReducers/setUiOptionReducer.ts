import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { setUiOption } from 'client/store/geo/mosaic/actions/setUiOption'
import { MosaicState } from 'client/store/geo/mosaic/state'

export const setUiOptionReducer = (builder: ActionReducerMapBuilder<MosaicState>) => {
  builder.addCase(setUiOption, (state, action) => {
    const { key, value } = action.payload

    Objects.setInPath({ obj: state, path: ['ui', key], value })
  })
}

import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { setOptionsProperty } from 'client/store/geo/layers/actions/setOptionsProperty'
import { GeoLayersState } from 'client/store/geo/layers/state'

export const setOptionsPropertyReducer = (builder: ActionReducerMapBuilder<GeoLayersState>): void => {
  builder.addCase(setOptionsProperty, (state, action) => {
    const { key, layerKey, value } = action.payload

    Objects.setInPath({ obj: state, path: [layerKey, 'options', key], value })
  })
}

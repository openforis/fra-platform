import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { setProperty } from 'client/store/geo/layers/actions/setProperty'
import { LayersState } from 'client/store/geo/layers/state'

export const setPropertyReducer = (builder: ActionReducerMapBuilder<LayersState>) => {
  builder.addCase(setProperty, (state, action) => {
    const { key, layerKey, value } = action.payload

    Objects.setInPath({ obj: state, path: [layerKey, key], value })
  })
}

import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { setOptionsProperty } from 'client/store/geo/layers/actions/setOptionsProperty'
import { LayersState } from 'client/store/geo/layers/state'

export const setOptionsPropertyReducer = (builder: ActionReducerMapBuilder<LayersState>) => {
  builder.addCase(setOptionsProperty, (state, action) => {
    const { layerKey, propertyKey, value } = action.payload

    Objects.setInPath({ obj: state, path: [layerKey, 'options', propertyKey], value })
  })
}

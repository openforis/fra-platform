import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { setOptions } from 'client/store/geo/map/actions/setOptions'
import { GeoMapState } from 'client/store/geo/map/state'

export const setOptionsReducer = (builder: ActionReducerMapBuilder<GeoMapState>) => {
  builder.addCase(setOptions, (state, action) => {
    const { datum } = action.payload
    state.options = { ...state.options, ...datum }
  })
}

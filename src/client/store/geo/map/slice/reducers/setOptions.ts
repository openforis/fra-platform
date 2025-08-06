import { Draft, PayloadAction } from '@reduxjs/toolkit'

import { GeoMapOptions, GeoMapState } from 'client/store/geo/map/state'

type Payload = Partial<GeoMapOptions>

export const setOptions = (state: Draft<GeoMapState>, action: PayloadAction<Payload>) => {
  const { payload } = action
  state.options = { ...state.options, ...payload }
  return state
}

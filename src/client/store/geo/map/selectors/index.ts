import { createSelector } from '@reduxjs/toolkit'

import { GeoMapSlice } from 'client/store/geo/map/slice'
import { GeoMapOptions } from 'client/store/geo/map/state'
import { GeoSliceName } from 'client/store/geo/slice'
import { RootState } from 'client/store/types'

const _getState = (state: RootState) => state[GeoSliceName]?.[GeoMapSlice.name]

const emptyOptions: Partial<GeoMapOptions> = {}

const getOptions = createSelector(_getState, (state) => {
  return state?.options ?? emptyOptions
})

export const GeoMapSelectors = {
  getOptions,
}

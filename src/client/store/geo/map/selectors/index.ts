import { createSelector } from '@reduxjs/toolkit'

import { GeoMapSliceName } from 'client/store/geo/map/slice/name'
import { GeoMapOptions } from 'client/store/geo/map/state'
import { GeoSliceName } from 'client/store/geo/slice/name'
import { RootState } from 'client/store/types'

const _getState = (state: RootState) => state[GeoSliceName]?.[GeoMapSliceName]

const emptyOptions: Partial<GeoMapOptions> = {}

const getOptions = createSelector(_getState, (state) => {
  return state?.options ?? emptyOptions
})

export const GeoMapSelectors = {
  getOptions,
}

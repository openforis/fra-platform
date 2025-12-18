import { createSelector } from '@reduxjs/toolkit'

import { GeoBoundariesSliceName } from 'client/store/geo/boundaries/slice/name'
import { GeoSliceName } from 'client/store/geo/slice/name'
import { RootState } from 'client/store/types'

const getBoundaries = createSelector(
  (state: RootState) => state[GeoSliceName]?.[GeoBoundariesSliceName],
  (boundariesState) => boundariesState
)

const getShowUnBoundaries = createSelector(getBoundaries, (state) => state?.showUnBoundaries)

const getStatus = createSelector(getBoundaries, (state) => state?.status)

const getTileUrl = createSelector(getBoundaries, (state) => state?.tileUrl)

export const BoundariesSelectors = {
  getBoundaries,
  getShowUnBoundaries,
  getStatus,
  getTileUrl,
}

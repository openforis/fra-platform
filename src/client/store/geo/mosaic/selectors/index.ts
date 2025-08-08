import { createSelector } from '@reduxjs/toolkit'

import { MosaicSliceName } from 'client/store/geo/mosaic/slice/name'
import { GeoSliceName } from 'client/store/geo/slice/name'
import { RootState } from 'client/store/types'

const _getState = (state: RootState) => state[GeoSliceName]?.[MosaicSliceName]

const getOptions = createSelector(_getState, (state) => {
  return state?.options
})

export const MosaicSelectors = {
  getOptions,
}

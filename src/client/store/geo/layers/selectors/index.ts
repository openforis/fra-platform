import { createSelector } from '@reduxjs/toolkit'

import { LayerKey } from 'meta/geo'

import { LayersSliceName } from 'client/store/geo/layers/slice/name'
import { GeoSliceName } from 'client/store/geo/slice/name'
import { RootState } from 'client/store/types'

const _getState = (state: RootState) => state[GeoSliceName]?.[LayersSliceName]

const getLayer = createSelector([_getState, (_state: RootState, layerKey: LayerKey) => layerKey], (state, layerKey) => {
  return state[layerKey]
})

export const LayersSelectors = {
  getLayer,
}

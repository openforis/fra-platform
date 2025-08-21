import { createSelector } from '@reduxjs/toolkit'

import { LayerKey } from 'meta/geo'

import { LayersSliceName } from 'client/store/geo/layers/slice/name'
import { GeoSliceName } from 'client/store/geo/slice/name'
import { RootState } from 'client/store/types'

const getLayers = createSelector(
  (state: RootState) => state[GeoSliceName]?.[LayersSliceName],
  (layersState) => layersState
)

const getLayer = createSelector(
  [getLayers, (_state: RootState, layerKey: LayerKey) => layerKey],
  (layersState, layerKey) => layersState?.[layerKey]
)

export const LayersSelectors = {
  getLayer,
  getLayers,
}

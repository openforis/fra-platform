import { createSelector } from '@reduxjs/toolkit'

import { LayerKey } from 'meta/geo/layer/key'

import { GeoLayersSliceName } from 'client/store/geo/layers/slice/name'
import { GeoSliceName } from 'client/store/geo/slice/name'
import { RootState } from 'client/store/types'

const getLayers = createSelector(
  (state: RootState) => state[GeoSliceName]?.[GeoLayersSliceName],
  (layersState) => layersState
)

const getLayer = createSelector(
  [getLayers, (_state: RootState, layerKey: LayerKey): LayerKey => layerKey],
  (layersState, layerKey) => layersState?.[layerKey]
)

export const LayersSelectors = {
  getLayer,
  getLayers,
}

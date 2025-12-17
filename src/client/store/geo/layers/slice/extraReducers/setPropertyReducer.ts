import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { LayerKey } from 'meta/geo/layer/key'
import { Objects } from 'utils/objects'

import { setProperty } from 'client/store/geo/layers/actions/setProperty'
import { GeoLayersState } from 'client/store/geo/layers/state'
import { mapController } from 'client/geo/mapController'

const _handleTileUrl = (state: GeoLayersState, layerKey: LayerKey, tileUrl?: string): void => {
  if (tileUrl === null) return

  mapController.removeLayer(layerKey)
  const layerState = state[layerKey]
  const opacity = layerState.opacity ?? 0
  mapController.addOrUpdateEarthEngineLayer(layerKey, opacity, tileUrl)
}

const _handleSelected = (state: GeoLayersState, layerKey: LayerKey, selected: boolean): void => {
  const layerState = state[layerKey]
  if (selected) {
    mapController.addOrUpdateEarthEngineLayer(layerKey, layerState.opacity ?? 1, layerState.tileUrl)
  } else {
    mapController.removeLayer(layerKey)
  }
}

export const setPropertyReducer = (builder: ActionReducerMapBuilder<GeoLayersState>): void => {
  builder.addCase(setProperty, (state, action) => {
    const { key, layerKey, value } = action.payload

    Objects.setInPath({ obj: state, path: [layerKey, key], value })

    // Handle map side effects
    if (key === 'tileUrl') _handleTileUrl(state, layerKey, value)
    if (key === 'selected') _handleSelected(state, layerKey, value)
  })
}

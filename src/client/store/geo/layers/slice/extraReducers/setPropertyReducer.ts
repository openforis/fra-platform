import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { LayerKey } from 'meta/geo'

import { setProperty } from 'client/store/geo/layers/actions/setProperty'
import { GeoLayersState } from 'client/store/geo/layers/state'
import { mapController } from 'client/utils'

const _handleMapId = (state: GeoLayersState, layerKey: LayerKey, mapId: string | null): void => {
  if (mapId === null) return
  mapController.removeLayer(layerKey)
  const opacity = state[layerKey].opacity ?? 0
  mapController.addOrUpdateEarthEngineLayer(layerKey, mapId, opacity)
}

const _handleSelected = (state: GeoLayersState, layerKey: LayerKey, selected: boolean): void => {
  const layerState = state[layerKey]
  if (selected) {
    mapController.addOrUpdateEarthEngineLayer(layerKey, layerState.mapId, layerState.opacity ?? 1)
  } else {
    mapController.removeLayer(layerKey)
  }
}

export const setPropertyReducer = (builder: ActionReducerMapBuilder<GeoLayersState>): void => {
  builder.addCase(setProperty, (state, action) => {
    const { key, layerKey, value } = action.payload

    Objects.setInPath({ obj: state, path: [layerKey, key], value })

    // Handle map side effects
    if (key === 'mapId') _handleMapId(state, layerKey, value)
    if (key === 'selected') _handleSelected(state, layerKey, value)
  })
}

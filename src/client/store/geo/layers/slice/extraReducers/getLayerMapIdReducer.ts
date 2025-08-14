import { ActionReducerMapBuilder, Draft } from '@reduxjs/toolkit'

import { LayerKey, LayerSectionKey, MapLayerKey } from 'meta/geo'

import { getLayerMapId } from 'client/store/geo/layers/actions/getLayerMapId'
import { LayersState, LayerState } from 'client/store/geo/layers/state'
import { LayerFetchStatus } from 'client/store/ui/geo/stateType'
import { mapController } from 'client/utils'

const _getLayerState = (state: Draft<LayersState>, layerKey: LayerKey): LayerState => {
  state[layerKey] ??= {}
  return state[layerKey]
}

const _handleGetLayerMapIdStatus = (
  state: Draft<LayersState>,
  sectionKey: LayerSectionKey,
  layerKey: LayerKey,
  status: LayerFetchStatus,
  mapId: string | null = null
): LayerState => {
  const layerState = _getLayerState(state, layerKey)
  let newLayerState = { status, mapId } as LayerState

  const mapLayerKey: MapLayerKey = `${sectionKey}-${layerKey}`

  switch (status) {
    case LayerFetchStatus.Ready:
      if (mapId) {
        // TODO: setMapIdCache(state, sectionKey, layerKey, mapId)
        const opacity = layerState.opacity ?? 1
        if (layerState.selected) {
          mapController.addOrUpdateEarthEngineLayer(mapLayerKey, mapId, opacity)
        } else {
          mapController.removeLayer(mapLayerKey)
        }
      }
      break
    case LayerFetchStatus.Loading:
      mapController.removeLayer(mapLayerKey)
      break
    case LayerFetchStatus.Failed:
      if (layerState.options?.assetId) newLayerState = { ...newLayerState, selected: false }
      mapController.removeLayer(mapLayerKey)
      break
    default:
      return null
  }
  state[layerKey] = { ...state[layerKey], ...newLayerState }
  return state[layerKey]
}

export const getLayerMapIdReducer = (builder: ActionReducerMapBuilder<LayersState>) => {
  builder.addCase(getLayerMapId.pending, (state, { meta }) => {
    _handleGetLayerMapIdStatus(state, meta.arg.sectionKey, meta.arg.layerKey, LayerFetchStatus.Loading)
  })

  builder.addCase(getLayerMapId.rejected, (state, { meta }) => {
    _handleGetLayerMapIdStatus(state, meta.arg.sectionKey, meta.arg.layerKey, LayerFetchStatus.Failed)
  })

  builder.addCase(getLayerMapId.fulfilled, (state, { payload }) => {
    const { layerKey, mapId, sectionKey } = payload
    _handleGetLayerMapIdStatus(state, sectionKey, layerKey, LayerFetchStatus.Ready, mapId)
  })
}

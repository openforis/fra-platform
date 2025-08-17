import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { LayerKey, LayerSectionKey } from 'meta/geo'

import { getLayerMapId } from 'client/store/geo/layers/actions/getLayerMapId'
import { getAgreementLayerCacheKey } from 'client/store/geo/layers/slice/utils'
import { LayersState } from 'client/store/geo/layers/state'
import { LayerFetchStatus } from 'client/store/ui/geo/stateType'
import { mapController } from 'client/utils'

const _setLayerCache = (state: LayersState, sectionKey: LayerSectionKey, layerKey: LayerKey, mapId: string) => {
  state[layerKey].options ??= {}
  const layerOptions = state[layerKey].options

  // No cache needed for layers without options or custom asset layers
  if (Objects.isEmpty(layerOptions) || layerOptions.assetId !== undefined) return

  const { agreementLayer, gteTreeCoverPercent, year } = layerOptions

  let cacheKey: string | null = null
  if (!Objects.isEmpty(agreementLayer?.level)) {
    cacheKey = getAgreementLayerCacheKey(state, sectionKey)
  } else if (!Objects.isEmpty(year)) {
    cacheKey = year.toString()
  } else if (!Objects.isEmpty(gteTreeCoverPercent)) {
    cacheKey = gteTreeCoverPercent.toString()
  }

  if (cacheKey !== null) {
    Objects.setInPath({ obj: state, path: [layerKey, 'cache', cacheKey], value: mapId })
  }
}

export const getLayerMapIdReducer = (builder: ActionReducerMapBuilder<LayersState>) => {
  builder.addCase(getLayerMapId.pending, (state, { meta }) => {
    const { layerKey } = meta.arg
    Objects.setInPath({ obj: state, path: [layerKey, 'status'], value: LayerFetchStatus.Loading })
    Objects.setInPath({ obj: state, path: [layerKey, 'mapId'], value: null })

    mapController.removeLayer(layerKey)
  })

  builder.addCase(getLayerMapId.rejected, (state, { meta }) => {
    const { layerKey } = meta.arg
    Objects.setInPath({ obj: state, path: [layerKey, 'status'], value: LayerFetchStatus.Failed })
    Objects.setInPath({ obj: state, path: [layerKey, 'mapId'], value: null })

    const layerState = state[layerKey]

    if (!Objects.isEmpty(layerState.options?.assetId)) {
      Objects.setInPath({ obj: state, path: [layerKey, 'selected'], value: false })
    }

    mapController.removeLayer(layerKey)
  })

  builder.addCase(getLayerMapId.fulfilled, (state, { payload }) => {
    const { layerKey, mapId = null, sectionKey } = payload
    Objects.setInPath({ obj: state, path: [layerKey, 'status'], value: LayerFetchStatus.Ready })
    Objects.setInPath({ obj: state, path: [layerKey, 'mapId'], value: mapId })

    if (Objects.isEmpty(mapId)) return

    const layerState = state[layerKey]

    if (Objects.isEmpty(layerState.opacity)) {
      layerState.opacity = 1
    }
    if (layerState.selected) {
      mapController.addOrUpdateEarthEngineLayer(layerKey, mapId, layerState.opacity)
    } else {
      mapController.removeLayer(layerKey)
    }

    _setLayerCache(state, sectionKey, layerKey, mapId)
  })
}

import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { LayerKey } from 'meta/geo/layer/key'
import { LayerSectionKey } from 'meta/geo/layer/sectionKey'
import { Objects } from 'utils/objects'

import { getLayerMapId } from 'client/store/geo/layers/actions/getLayerMapId'
import { getAgreementLayerCacheKey } from 'client/store/geo/layers/slice/utils'
import { GeoLayersState, LayerFetchStatus } from 'client/store/geo/layers/state'
import { mapController } from 'client/geo/mapController'

const _setLayerCache = (
  state: GeoLayersState,
  sectionKey: LayerSectionKey,
  layerKey: LayerKey,
  tileUrl: string
): void => {
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
    Objects.setInPath({ obj: state, path: [layerKey, 'cache', cacheKey], value: tileUrl })
  }
}

export const getLayerMapIdReducer = (builder: ActionReducerMapBuilder<GeoLayersState>): void => {
  builder.addCase(getLayerMapId.pending, (state, { meta }) => {
    const { layerKey } = meta.arg

    Objects.setInPath({ obj: state, path: [layerKey, 'status'], value: LayerFetchStatus.Loading })
    Objects.unset(state, [layerKey, 'mapId'])
    Objects.unset(state, [layerKey, 'tileUrl'])

    mapController.removeLayer(layerKey)
  })

  builder.addCase(getLayerMapId.rejected, (state, { meta }) => {
    const { layerKey } = meta.arg
    Objects.setInPath({ obj: state, path: [layerKey, 'status'], value: LayerFetchStatus.Failed })
    Objects.unset(state, [layerKey, 'mapId'])
    Objects.unset(state, [layerKey, 'tileUrl'])

    const layerState = state[layerKey]

    if (!Objects.isEmpty(layerState.options?.assetId)) {
      Objects.setInPath({ obj: state, path: [layerKey, 'selected'], value: false })
    }

    mapController.removeLayer(layerKey)
  })

  builder.addCase(getLayerMapId.fulfilled, (state, { payload }) => {
    const { layerKey, mapId, sectionKey, tileUrl } = payload

    Objects.setInPath({ obj: state, path: [layerKey, 'status'], value: LayerFetchStatus.Ready })
    Objects.setInPath({ obj: state, path: [layerKey, 'mapId'], value: mapId })
    Objects.setInPath({ obj: state, path: [layerKey, 'tileUrl'], value: tileUrl })

    if (Objects.isEmpty(tileUrl)) return

    const layerState = state[layerKey]

    if (Objects.isEmpty(layerState.opacity)) {
      layerState.opacity = 1
    }
    if (layerState.selected) {
      mapController.addOrUpdateEarthEngineLayer(layerKey, layerState.opacity, tileUrl)
    } else {
      mapController.removeLayer(layerKey)
    }

    _setLayerCache(state, sectionKey, layerKey, tileUrl)
  })
}

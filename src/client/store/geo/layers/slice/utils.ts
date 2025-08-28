import { Objects } from 'utils/objects'

import { LayerKey, LayerSectionKey } from 'meta/geo/layer'
import { sectionsMap } from 'meta/geo/sections'

import { GeoLayersState, LayerState } from 'client/store/geo/layers/state'

const _getLayerCacheKey = (layerKey: LayerKey, layerState: LayerState): string => {
  if (Objects.isEmpty(layerState?.options)) return layerKey
  const { agreementLayer, assetId, gteTreeCoverPercent, year } = layerState.options
  switch (true) {
    case agreementLayer?.level !== undefined:
      return `${layerKey}:${agreementLayer?.level}`
    case assetId !== undefined:
      return `${layerKey}:${assetId}`
    case year !== undefined:
      return `${layerKey}:${year}`
    case gteTreeCoverPercent !== undefined:
      return `${layerKey}:${gteTreeCoverPercent}`
    default:
      return layerKey
  }
}

export const getAgreementLayerCacheKey = (state: GeoLayersState, sectionKey: LayerSectionKey): string => {
  const layerCacheKeys: Array<string> = []
  const sectionLayers = sectionsMap[sectionKey].layers

  sectionLayers.forEach((layer) => {
    const layerState = state[layer.key]
    if (layerState?.selected) {
      layerCacheKeys.push(_getLayerCacheKey(layer.key, layerState))
    }
  })

  return layerCacheKeys.join('-')
}

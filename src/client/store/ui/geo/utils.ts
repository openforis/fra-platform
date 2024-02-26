import { Objects } from 'utils/objects'

import { LayerKey } from 'meta/geo/layer'

import { LayersSectionState, LayerState } from './stateType'

const _getLayerCacheLabel = (layerKey: LayerKey, layerState: LayerState): string => {
  if (Objects.isEmpty(layerState.options)) return layerKey
  const { agreementLayer, assetId, year, gteTreeCoverPercent } = layerState.options
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

export const getAgreementLayerCacheKey = (sectionState: LayersSectionState): string => {
  const layersCacheLabels: string[] = []

  Object.keys(sectionState).forEach((layerKey) => {
    const layerState = sectionState[layerKey as LayerKey]
    if (layerState?.selected) {
      layersCacheLabels.push(_getLayerCacheLabel(layerKey as LayerKey, layerState))
    }
  })

  return layersCacheLabels.join('-')
}

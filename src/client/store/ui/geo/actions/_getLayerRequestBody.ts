import { LayerRequestBody } from 'meta/api/request/geo/layer'
import { CountryIso } from 'meta/area'
import { ForestKey, LayerKey, LayerSource } from 'meta/geo'

import { LayersSectionState, LayerState } from '../stateType'

export const buildLayerData = (layerKey: LayerKey, layerState: LayerState): LayerSource => {
  return {
    key: layerKey,
    ...(layerState?.options && { options: { ...layerState.options } }),
  }
}

const _buildAgreementLayerData = (
  sectionState: LayersSectionState,
  layerKey: LayerKey,
  layerState: LayerState
): LayerSource => {
  const layers: LayerSource[] = []
  // Build an array of the selected layers, ignoring agreement
  Object.keys(sectionState).forEach((layerKey) => {
    if (layerKey === ForestKey.Agreement) return
    const layerState = sectionState[layerKey as LayerKey]
    if (layerState.selected) {
      layers.push(buildLayerData(layerKey as LayerKey, layerState))
    }
  })
  return {
    key: layerKey,
    options: {
      agreement: {
        layers,
        gteAgreementLevel: layerState?.options?.agreementLayer?.level ?? 1,
      },
    },
  }
}

export const _getLayerRequestBody = (
  countryIso: CountryIso,
  layerKey: LayerKey,
  layerState: LayerState,
  sectionState: LayersSectionState = null
): LayerRequestBody => {
  const requestBody: LayerRequestBody = {
    countryIso,
    layer:
      layerKey === ForestKey.Agreement && sectionState
        ? _buildAgreementLayerData(sectionState, layerKey, layerState)
        : buildLayerData(layerKey, layerState),
  }
  return requestBody
}

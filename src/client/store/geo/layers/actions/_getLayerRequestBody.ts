import { LayerRequestBody } from 'meta/api/request/geo/layer'
import { CountryIso } from 'meta/area'
import { ForestKey, Layer, LayerKey, LayerSource } from 'meta/geo'

import { LayerFetchStatus, LayersSectionState, LayersState, LayerState } from 'client/store/geo/layers/state'

export const buildLayerData = (layerKey: LayerKey, layerState: LayerState): LayerSource => {
  return {
    key: layerKey,
    ...(layerState?.options && { options: { ...layerState.options } }),
  }
}

const _buildAgreementLayerData = (
  layersState: LayersSectionState,
  sectionLayers: Array<Layer>,
  layerKey: LayerKey,
  agreementLayerState: LayerState
): LayerSource => {
  const layers: Array<LayerSource> = []
  // Build an array of the selected layers, ignoring agreement
  sectionLayers.forEach(({ key: layerKey }) => {
    if (layerKey === ForestKey.Agreement) return
    const layerState = layersState[layerKey as LayerKey]
    if (
      layerState.selected &&
      (layerKey !== ForestKey.CustomFnF ||
        (layerState.options?.assetId && layerState.status === LayerFetchStatus.Ready))
    ) {
      layers.push(buildLayerData(layerKey as LayerKey, layerState))
    }
  })
  return {
    key: layerKey,
    options: {
      agreement: {
        layers,
        gteAgreementLevel: agreementLayerState?.options?.agreementLayer?.level ?? 1,
      },
    },
  }
}

export const _getLayerRequestBody = (
  countryIso: CountryIso,
  layerKey: LayerKey,
  layerState: LayerState,
  layersState: LayersState = null,
  sectionLayers: Array<Layer> = []
): LayerRequestBody => {
  const requestBody: LayerRequestBody = {
    countryIso,
    layer:
      layerKey === ForestKey.Agreement && layersState
        ? _buildAgreementLayerData(layersState, sectionLayers, layerKey, layerState)
        : buildLayerData(layerKey, layerState),
  }
  return requestBody
}

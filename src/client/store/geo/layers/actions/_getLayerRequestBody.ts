import { Objects } from 'utils/objects'

import { LayerRequestBody } from 'meta/api/request/geo/layer'
import { CountryIso } from 'meta/area/countryIso'
import { ForestKey, Layer, LayerKey, LayerSource } from 'meta/geo'

import { GeoLayersState, LayerFetchStatus, LayersSectionState, LayerState } from 'client/store/geo/layers/state'

export const buildLayerData = (layerKey: LayerKey, layerState: LayerState): LayerSource => {
  const data: LayerSource = { key: layerKey }

  if (!Objects.isEmpty(layerState?.options)) {
    data.options = Objects.cloneDeep(layerState.options)
  }

  return data
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
    const layerState = layersState[layerKey]
    if (Objects.isEmpty(layerState)) return
    if (layerKey === ForestKey.Agreement) return
    if (
      layerState.selected &&
      (layerKey !== ForestKey.CustomFnF ||
        (layerState.options?.assetId && layerState.status === LayerFetchStatus.Ready))
    ) {
      layers.push(buildLayerData(layerKey, layerState))
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
  layersState: GeoLayersState = null,
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

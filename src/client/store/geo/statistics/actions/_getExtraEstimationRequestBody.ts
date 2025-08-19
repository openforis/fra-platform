import { Objects } from 'utils/objects'

import { ForestAgreementAreaEstimationRequestBody } from 'meta/api/request/geo/layer'
import { CountryIso } from 'meta/area'
import { ForestKey, LayerSectionKey, LayerSource } from 'meta/geo'
import { sectionsMap } from 'meta/geo/sections'

import { buildLayerData } from 'client/store/geo/layers/actions/_getLayerRequestBody'
import { LayersState } from 'client/store/geo/layers/state'

export const _getExtraEstimationRequestBody = (
  countryIso: CountryIso,
  scale: number,
  layersState: LayersState,
  sectionKey: LayerSectionKey
): ForestAgreementAreaEstimationRequestBody => {
  const layers: Array<LayerSource> = []

  const sectionLayers = sectionsMap[sectionKey].layers

  sectionLayers.forEach(({ key: layerKey }) => {
    const layerState = layersState[layerKey]
    if (Objects.isEmpty(layerState)) return
    if (!layerState?.selected) return
    layers.push(buildLayerData(layerKey, layerState))
  })

  const gteAgreementLevel = layersState[ForestKey.Agreement]?.options?.agreementLayer?.level ?? 1

  return {
    countryIso,
    gteAgreementLevel,
    layers,
    scale,
  }
}

import { ForestAgreementAreaEstimationRequestBody } from 'meta/api/request/geo/layer'
import { CountryIso } from 'meta/area'
import { ForestKey, LayerKey, LayerSource } from 'meta/geo'

import { buildLayerData } from 'client/store/geo/layers/actions/_getLayerRequestBody'
import { LayersSectionState } from 'client/store/geo/layers/state'

export const _getExtraEstimationRequestBody = (
  countryIso: CountryIso,
  scale: number,
  sectionState: LayersSectionState
): ForestAgreementAreaEstimationRequestBody => {
  const layers: Array<LayerSource> = []
  let agreementLevel = 1 // Default agreement level
  Object.keys(sectionState).forEach((layerKey) => {
    const layerState = sectionState[layerKey as LayerKey]
    if (layerKey === ForestKey.Agreement) {
      agreementLevel = layerState.options?.agreementLayer?.level ?? agreementLevel
      return
    }
    if (layerState.selected) {
      layers.push(buildLayerData(layerKey as LayerKey, layerState))
    }
  })
  return {
    countryIso,
    gteAgreementLevel: agreementLevel,
    layers,
    scale,
  }
}

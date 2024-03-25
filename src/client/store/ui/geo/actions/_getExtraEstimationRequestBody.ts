import { ForestAgreementAreaEstimationRequestBody } from 'meta/api/request/geo/layer'
import { CountryIso } from 'meta/area'
import { ForestKey, LayerKey, LayerSource } from 'meta/geo'

import { LayersSectionState } from '../stateType'
import { buildLayerData } from './_getLayerRequestBody'

export const _getExtraEstimationRequestBody = (
  countryIso: CountryIso,
  scale: number,
  sectionState: LayersSectionState
): ForestAgreementAreaEstimationRequestBody => {
  const layers: LayerSource[] = []
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

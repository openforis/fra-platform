import { LayerRequestBody } from '@meta/api/request/geo/layer'
import { CountryIso } from '@meta/area'
import { LayerKey } from '@meta/geo'

import { LayerState } from '../stateType'

export const _getLayerRequestBody = (
  countryIso: CountryIso,
  layerKey: LayerKey,
  layerState: LayerState
): LayerRequestBody => {
  const requestBody: LayerRequestBody = {
    countryIso,
    layer: {
      key: layerKey,
      ...(layerState?.options && { options: { ...layerState.options } }),
    },
  }
  return requestBody
}

import { LayerKey } from 'meta/geo'

import { LayersSelectors } from 'client/store/geo/layers/selectors'
import { useAppSelector } from 'client/store/hooks'
import { LayerState } from 'client/store/ui/geo/stateType'

export const useGeoLayer = (layerKey: LayerKey): LayerState | undefined =>
  useAppSelector((state) => LayersSelectors.getLayer(state, layerKey))

import { LayerKey } from 'meta/geo'

import { LayersSelectors } from 'client/store/geo/layers/selectors'
import { LayersState } from 'client/store/geo/layers/state'
import { useAppSelector } from 'client/store/hooks'
import { LayerState } from 'client/store/ui/geo/stateType'

export const useGeoLayers = (): LayersState => useAppSelector(LayersSelectors.getLayers)

export const useGeoLayer = (layerKey: LayerKey): LayerState | undefined =>
  useAppSelector((state) => LayersSelectors.getLayer(state, layerKey))

import { LayerKey } from 'meta/geo'

import { LayersSelectors } from 'client/store/geo/layers/selectors'
import { initialState, LayersState, LayerState } from 'client/store/geo/layers/state'
import { useAppSelector } from 'client/store/hooks'

export const useGeoLayers = (): LayersState => useAppSelector(LayersSelectors.getLayers) ?? initialState

export const useGeoLayer = (layerKey: LayerKey): LayerState | undefined =>
  useAppSelector((state) => LayersSelectors.getLayer(state, layerKey))

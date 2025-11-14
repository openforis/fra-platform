import { LayerKey } from 'meta/geo/layer/key'

import { LayersSelectors } from 'client/store/geo/layers/selectors'
import { GeoLayersState, initialState, LayerState } from 'client/store/geo/layers/state'
import { useAppSelector } from 'client/store/hooks'

export const useGeoLayers = (): GeoLayersState => useAppSelector(LayersSelectors.getLayers) ?? initialState

export const useGeoLayer = (layerKey: LayerKey): LayerState | undefined =>
  useAppSelector((state) => LayersSelectors.getLayer(state, layerKey))

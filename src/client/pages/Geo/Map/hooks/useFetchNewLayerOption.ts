import { useEffect } from 'react'

import { LayerKey } from 'meta/geo/layer/key'
import { Layer } from 'meta/geo/layer/layer'
import { LayerSectionKey } from 'meta/geo/layer/sectionKey'

import { LayersActions } from 'client/store/geo/layers/actions'
import { useGeoLayer } from 'client/store/geo/layers/hooks/layers'
import { LayerStateOptions } from 'client/store/geo/layers/state'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryIso } from 'client/hooks/country'

export const useFetchNewLayerOption = (
  sectionKey: LayerSectionKey,
  layerKey: LayerKey,
  layerOptionKey: keyof Omit<LayerStateOptions, 'agreementLayer'>,
  layer: Layer
): void => {
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const layerState = useGeoLayer(layerKey)
  const layerOptionValue = layerState?.options?.[layerOptionKey]

  useEffect(
    () => {
      if (!layerState?.selected) return
      if (layerOptionValue === undefined) {
        if (layerOptionKey === 'gteTreeCoverPercent') {
          const gteTreeCoverPercent = layer.options.gteTreeCoverPercent.at(0)
          dispatch(
            LayersActions.setOptionsProperty({ layerKey, key: 'gteTreeCoverPercent', value: gteTreeCoverPercent })
          )
        }
        return
      }
      const cachedMapId = layerState.cache?.[layerOptionValue]
      if (cachedMapId === undefined) {
        if (layerState?.opacity > 0) {
          dispatch(LayersActions.getLayerMapId({ countryIso, layerKey, sectionKey }))
        } else {
          dispatch(LayersActions.resetLayerStatus({ layerKey }))
        }
      } else {
        dispatch(LayersActions.setProperty({ key: 'mapId', layerKey, value: cachedMapId }))
      }
    },
    // Ignore opacity changes:
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      countryIso,
      dispatch,
      layer,
      layerKey,
      layerOptionKey,
      layerOptionValue,
      layerState?.cache,
      layerState?.selected,
      sectionKey,
    ]
  )
}

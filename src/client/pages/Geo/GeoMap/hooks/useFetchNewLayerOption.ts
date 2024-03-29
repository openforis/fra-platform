import { useEffect } from 'react'

import { Layer, LayerKey, LayerSectionKey } from 'meta/geo'

import { useAppDispatch } from 'client/store'
import { GeoActions, useGeoLayer } from 'client/store/ui/geo'
import { LayerStateOptions } from 'client/store/ui/geo/stateType'
import { useCountryIso } from 'client/hooks'

export const useFetchNewLayerOption = (
  sectionKey: LayerSectionKey,
  layerKey: LayerKey,
  layerOptionKey: keyof Omit<LayerStateOptions, 'agreementLayer'>,
  layer: Layer
) => {
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const layerState = useGeoLayer(sectionKey, layerKey)
  const layerOptionValue = layerState?.options?.[layerOptionKey]

  useEffect(
    () => {
      if (!layerState?.selected) return
      if (layerOptionValue === undefined) {
        if (layerOptionKey === 'gteTreeCoverPercent') {
          const gteTreeCoverPercent = layer.options.gteTreeCoverPercent.at(0)
          dispatch(GeoActions.setLayerGteTreeCoverPercent({ sectionKey, layerKey, gteTreeCoverPercent }))
        }
        return
      }
      const cachedMapId = layerState.cache?.[layerOptionValue]
      if (cachedMapId === undefined) {
        if (layerState?.opacity > 0) {
          dispatch(GeoActions.postLayer({ countryIso, sectionKey, layerKey }))
        } else {
          dispatch(GeoActions.resetLayerStatus({ sectionKey, layerKey }))
        }
      } else {
        dispatch(GeoActions.setLayerMapId({ sectionKey, layerKey, mapId: cachedMapId, drawLayer: true }))
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

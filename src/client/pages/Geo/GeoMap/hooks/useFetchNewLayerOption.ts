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

  useEffect(() => {
    if (!layerState?.selected) return
    if (layerOptionValue === undefined) {
      if (layerOptionKey === 'gteTreeCoverPercent') {
        const gteTreeCoverPercent = layer.options.gteTreeCoverPercent.at(0)
        dispatch(GeoActions.setLayerGteTreeCoverPercent({ sectionKey, layerKey, gteTreeCoverPercent }))
      }
      return
    }
    dispatch(GeoActions.postLayer({ countryIso, sectionKey, layerKey }))
  }, [countryIso, layer, layerKey, layerOptionKey, layerOptionValue, layerState?.selected, sectionKey, dispatch])
}

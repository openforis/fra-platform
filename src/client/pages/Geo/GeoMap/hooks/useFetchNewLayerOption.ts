import { useEffect } from 'react'

import { LayerKey, LayerSectionKey } from 'meta/geo'

import { useAppDispatch } from 'client/store'
import { GeoActions, useGeoLayer } from 'client/store/ui/geo'
import { LayerStateOptions } from 'client/store/ui/geo/stateType'
import { useCountryIso } from 'client/hooks'

export const useFetchNewLayerOption = (
  sectionKey: LayerSectionKey,
  layerKey: LayerKey,
  layerOptionKey: keyof Omit<LayerStateOptions, 'agreementLayer'>
) => {
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const layerState = useGeoLayer(sectionKey, layerKey)
  const layerOptionValue = layerState?.options?.[layerOptionKey]

  useEffect(() => {
    if (layerOptionValue === undefined) return // Skip when the property is not set
    dispatch(GeoActions.postLayer({ countryIso, sectionKey, layerKey }))
  }, [countryIso, layerKey, layerOptionValue, sectionKey, dispatch])
}

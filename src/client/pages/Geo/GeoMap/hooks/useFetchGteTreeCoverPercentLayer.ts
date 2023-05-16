import { useEffect } from 'react'

import { LayerKey, LayerSectionKey } from '@meta/geo'

import { useAppDispatch } from '@client/store'
import { GeoActions, useGeoLayer } from '@client/store/ui/geo'
import { useCountryIso } from '@client/hooks'

export const useFetchGteTreeCoverPercentLayer = (sectionKey: LayerSectionKey, layerKey: LayerKey) => {
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const layerState = useGeoLayer(sectionKey, layerKey)
  const gteTreeCoverPercent = layerState?.options?.gteTreeCoverPercent

  useEffect(() => {
    if (gteTreeCoverPercent === undefined) return // Skip when the property is not set
    dispatch(GeoActions.postLayer({ countryIso, sectionKey, layerKey }))
  }, [countryIso, layerKey, gteTreeCoverPercent, sectionKey, dispatch])
}

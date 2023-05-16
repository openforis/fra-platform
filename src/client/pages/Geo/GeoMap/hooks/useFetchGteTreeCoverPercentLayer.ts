import { useEffect } from 'react'

import { LayerKey, LayerSectionKey } from '@meta/geo'

import { useAppDispatch } from '@client/store'
import { GeoActions, useGeoLayer } from '@client/store/ui/geo'
import { useCountryIso, usePrevious } from '@client/hooks'

export const useFetchGteTreeCoverPercentLayer = (sectionKey: LayerSectionKey, layerKey: LayerKey) => {
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const layerState = useGeoLayer(sectionKey, layerKey)
  const gteTreeCoverPercent = layerState?.options?.gteTreeCoverPercent
  const prevGteTreeCoverPercent = usePrevious(gteTreeCoverPercent)

  useEffect(() => {
    if (prevGteTreeCoverPercent === gteTreeCoverPercent) return // Skip if no change
    if (gteTreeCoverPercent === undefined) return // Skip when the property is not set
    if (prevGteTreeCoverPercent === null) return // Skip with initial prev. value

    dispatch(GeoActions.postLayer({ countryIso, sectionKey, layerKey }))
  }, [countryIso, layerKey, layerState, gteTreeCoverPercent, prevGteTreeCoverPercent, sectionKey, dispatch])
}

import { useEffect } from 'react'

import { LayerKey, LayerSectionKey } from 'meta/geo'

import { useAppDispatch } from 'client/store'
import { GeoActions, useGeoLayerSection } from 'client/store/ui/geo'
import { LayersSectionState } from 'client/store/ui/geo/stateType'
import { getAgreementLayerCacheKey } from 'client/store/ui/geo/utils'
import { useCountryIso } from 'client/hooks'

import { useCountSectionSelectedLayers } from './useCountSectionSelectedLayers'

export const useFetchAgreementLevelLayer = (sectionKey: LayerSectionKey, layerKey: LayerKey) => {
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const sectionState = useGeoLayerSection(sectionKey)
  const layerState = sectionState?.[layerKey]
  const agreementLevel = layerState?.options?.agreementLayer?.level
  const countSelectedLayers = useCountSectionSelectedLayers({ sectionKey, ignoreAgreementLayer: true })
  const cacheKey = getAgreementLayerCacheKey(sectionState ?? ({} as LayersSectionState))

  useEffect(() => {
    if (!layerState?.selected) return
    if (agreementLevel === undefined) {
      dispatch(GeoActions.setAgreementLevel({ sectionKey, layerKey, level: 1 }))
      return
    }
    if (countSelectedLayers < 2 || agreementLevel > countSelectedLayers) {
      dispatch(GeoActions.setLayerSelected({ sectionKey, layerKey, selected: false }))
      dispatch(GeoActions.setAgreementLevel({ sectionKey, layerKey, level: 1 }))
      return
    }

    const cachedMapId = layerState?.cache?.[cacheKey]
    if (cachedMapId === undefined) {
      dispatch(GeoActions.postLayer({ countryIso, sectionKey, layerKey }))
    } else {
      dispatch(GeoActions.setLayerMapId({ sectionKey, layerKey, mapId: cachedMapId, drawLayer: true }))
    }
  }, [
    agreementLevel,
    cacheKey,
    countSelectedLayers,
    countryIso,
    dispatch,
    layerKey,
    layerState?.cache,
    layerState?.selected,
    sectionKey,
  ])
}

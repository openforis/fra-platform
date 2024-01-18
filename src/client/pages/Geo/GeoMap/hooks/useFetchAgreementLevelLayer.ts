import { useEffect } from 'react'

import { LayerKey, LayerSectionKey } from 'meta/geo'

import { useAppDispatch } from 'client/store'
import { GeoActions, useGeoLayerSection } from 'client/store/ui/geo'
import { useCountryIso } from 'client/hooks'

import { useCountSectionSelectedLayers } from './useCountSectionSelectedLayers'

export const useFetchAgreementLevelLayer = (sectionKey: LayerSectionKey, layerKey: LayerKey) => {
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const sectionState = useGeoLayerSection(sectionKey)
  const layerState = sectionState?.[layerKey]
  const agreementLevel = layerState?.options?.agreementLayer?.level
  const countSelectedLayers = useCountSectionSelectedLayers({ sectionKey, ignoreAgreementLayer: true })

  useEffect(() => {
    if (!layerState?.selected) return
    if (agreementLevel === undefined) {
      dispatch(GeoActions.setAgreementLevel({ sectionKey, layerKey, level: 1 }))
      return
    }
    dispatch(GeoActions.postLayer({ countryIso, sectionKey, layerKey }))
  }, [countryIso, layerKey, layerState?.selected, agreementLevel, sectionKey, dispatch, countSelectedLayers])
}

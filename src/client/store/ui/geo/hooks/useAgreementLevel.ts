import { useEffect } from 'react'

import { LayerKey, LayerSectionKey } from '@meta/geo'

import { useAppDispatch } from '@client/store'
import { useCountryIso } from '@client/hooks'

import { GeoActions } from '../slice'
import { useGeoLayerSection } from '.'

export const useAgreementLevel = (sectionKey: LayerSectionKey, layerKey: LayerKey) => {
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const sectionState = useGeoLayerSection(sectionKey)
  const layerState = sectionState?.[layerKey]
  const agreementLevel = layerState?.options?.agreementLayer?.level

  useEffect(() => {
    if (agreementLevel === undefined) return // Skip when the property is not set
    dispatch(GeoActions.postLayer({ countryIso, sectionKey, layerKey }))
  }, [countryIso, layerKey, agreementLevel, sectionKey, dispatch])
}

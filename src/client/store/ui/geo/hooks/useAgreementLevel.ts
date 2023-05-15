import { useEffect } from 'react'

import { LayerKey, LayerSectionKey } from '@meta/geo'

import { useAppDispatch } from '@client/store'
import { useCountryIso, usePrevious } from '@client/hooks'

import { GeoActions } from '../slice'
import { useGeoLayerSection } from '.'

export const useAgreementLevel = (sectionKey: LayerSectionKey, layerKey: LayerKey) => {
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const sectionState = useGeoLayerSection(sectionKey)
  const layerState = sectionState?.[layerKey]
  const agreementLevel = layerState?.options?.agreementLayer?.level
  const prevAgreementLevel = usePrevious(agreementLevel)

  useEffect(() => {
    if (prevAgreementLevel === agreementLevel) return // Skip if no change
    if (agreementLevel === undefined) return // Skip when the property is not set
    if (prevAgreementLevel === null) return // Skip with initial prev. value

    dispatch(GeoActions.postLayer({ countryIso, sectionKey, layerKey, layerState, sectionState }))
  }, [countryIso, layerKey, sectionState, layerState, agreementLevel, prevAgreementLevel, sectionKey, dispatch])
}

import { useEffect } from 'react'

import { LayerKey, LayerSectionKey } from '@meta/geo'

import { useAppDispatch } from '@client/store'
import { GeoActions, useGeoLayerSection, useGeoLayerSectionRecipeName } from '@client/store/ui/geo'
import { useCountryIso, usePrevious } from '@client/hooks'

import { useCountSectionSelectedLayers } from './useCountSectionSelectedLayers'

export const useFetchAgreementLevelLayer = (sectionKey: LayerSectionKey, layerKey: LayerKey) => {
  const sectionRecipe = useGeoLayerSectionRecipeName(sectionKey)
  const prevSectionRecipe = usePrevious(sectionRecipe, sectionRecipe)
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const sectionState = useGeoLayerSection(sectionKey)
  const layerState = sectionState?.[layerKey]
  const agreementLevel = layerState?.options?.agreementLayer?.level
  const countSelectedLayers = useCountSectionSelectedLayers(sectionKey)

  useEffect(() => {
    // if (sectionRecipe !== prevSectionRecipe) {
    // }
    if (agreementLevel === undefined) return // Skip when the property is not set
    if (!layerState.selected) return
    dispatch(GeoActions.postLayer({ countryIso, sectionKey, layerKey }))
  }, [
    countryIso,
    layerKey,
    agreementLevel,
    sectionKey,
    dispatch,
    countSelectedLayers,
    sectionRecipe,
    prevSectionRecipe,
    layerState.selected,
  ])
}

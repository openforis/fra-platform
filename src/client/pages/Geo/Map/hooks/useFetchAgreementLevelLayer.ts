import { useEffect, useMemo } from 'react'

import { LayerKey, LayerSectionKey } from 'meta/geo'

import { LayersActions } from 'client/store/geo/layers/actions'
import { useGeoLayers } from 'client/store/geo/layers/hooks/layers'
import { getAgreementLayerCacheKey } from 'client/store/geo/layers/slice/utils'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryIso } from 'client/hooks'

import { useCountSectionSelectedLayers } from './useCountSectionSelectedLayers'

export const useFetchAgreementLevelLayer = (sectionKey: LayerSectionKey, layerKey: LayerKey) => {
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const layersState = useGeoLayers()
  const layerState = layersState?.[layerKey]
  const agreementLevel = layerState?.options?.agreementLayer?.level
  const countSelectedLayers = useCountSectionSelectedLayers({ sectionKey, ignoreAgreementLayer: true })
  const cacheKey = useMemo<string>(() => getAgreementLayerCacheKey(layersState, sectionKey), [layersState, sectionKey])

  useEffect(
    () => {
      if (!layerState?.selected) return
      if (agreementLevel === undefined) {
        dispatch(LayersActions.setAgreementProperty({ key: 'level', layerKey, value: 1 }))
        return
      }
      if (countSelectedLayers < 2 || agreementLevel > countSelectedLayers) {
        dispatch(LayersActions.setProperty({ key: 'selected', layerKey, value: false }))
        dispatch(LayersActions.setAgreementProperty({ key: 'level', layerKey, value: 1 }))
        return
      }

      const cachedMapId = layerState?.cache?.[cacheKey]
      if (cachedMapId === undefined) {
        if (layerState?.opacity > 0) {
          dispatch(LayersActions.getLayerMapId({ countryIso, layerKey, sectionKey }))
        } else {
          dispatch(LayersActions.resetLayerStatus({ layerKey }))
        }
      } else {
        dispatch(LayersActions.setProperty({ key: 'mapId', layerKey, value: cachedMapId }))
      }
    },
    // Ignore opacity changes:
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      agreementLevel,
      cacheKey,
      countryIso,
      countSelectedLayers,
      dispatch,
      layerKey,
      layerState?.cache,
      layerState?.selected,
      sectionKey,
    ]
  )
}

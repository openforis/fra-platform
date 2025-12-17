import { useEffect, useMemo } from 'react'

import { LayerKey } from 'meta/geo/layer/key'
import { LayerSectionKey } from 'meta/geo/layer/sectionKey'

import { LayersActions } from 'client/store/geo/layers/actions'
import { useGeoLayers } from 'client/store/geo/layers/hooks/layers'
import { getAgreementLayerCacheKey } from 'client/store/geo/layers/slice/utils'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryIso } from 'client/hooks/country'

import { useCountSectionSelectedLayers } from './useCountSectionSelectedLayers'

export const useFetchAgreementLevelLayer = (sectionKey: LayerSectionKey, layerKey: LayerKey): void => {
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

      const cacheTileUrl = layerState?.cache?.[cacheKey]
      if (cacheTileUrl === undefined) {
        if (layerState?.opacity > 0) {
          dispatch(LayersActions.getLayerMapId({ countryIso, layerKey, sectionKey }))
        } else {
          dispatch(LayersActions.resetLayerStatus({ layerKey }))
        }
      } else {
        dispatch(LayersActions.setProperty({ key: 'tileUrl', layerKey, value: cacheTileUrl }))
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

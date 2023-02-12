import React, { useEffect, useRef } from 'react'

import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { ForestSource, Layer } from '@meta/geo'
import { ForestSourceWithOptions, HansenPercentage } from '@meta/geo/forest'

import { useAppDispatch } from '@client/store'
import { GeoActions, useForestSourceOptions } from '@client/store/ui/geo'
import { getForestLayer } from '@client/store/ui/geo/actions'
import { useCountryIso, usePrevious } from '@client/hooks'
import { MapController } from '@client/utils'

import { layers } from '../GeoMapMenuData/MapVisualizerPanel'

const useHandleForestResourceLayers = (
  map: google.maps.Map,
  mapControllerRef: React.MutableRefObject<MapController>
) => {
  const countryIso = useCountryIso()
  const prevCountryIso = usePrevious(countryIso)
  const dispatch = useAppDispatch()
  const forestOptions = useForestSourceOptions()
  const hansenPercentageOnPreviousMapDraw = useRef<HansenPercentage>(forestOptions.hansenPercentage)

  // Keep track of the opacities to set them when the country switches
  // Done this way to avoid having 'forestOptions.opacity' in the following dependency
  // arrays (which eslint demands, although it's not necessary in this case)
  const opacities = useRef(forestOptions.opacity)
  useEffect(() => {
    opacities.current = forestOptions.opacity
  }, [forestOptions.opacity])

  // Handle a change of country ISO
  useEffect(() => {
    // Run only when the Country ISO changes and there is a map available
    if (!map || prevCountryIso === countryIso || !mapControllerRef.current) return
    layers.forEach(({ key: mapLayerKey }) => {
      // Remove the layer from the map since it belongs to the previous country
      mapControllerRef.current.removeEarthEngineLayer(mapLayerKey)
    })
    // Since the country changed, all layers previously fetched need to be cleared
    // This will trigger the loading of the layers in the next useEffect
    dispatch(GeoActions.resetLayersStates())
  }, [countryIso, map, mapControllerRef, prevCountryIso, dispatch])

  // Handle the cases where the state of the layers themselves change.
  useEffect(() => {
    // The country ISO switch was handled in the previous useEffect, so skip it here.
    if (prevCountryIso !== countryIso) return
    const hansenPercentageHasChanged = forestOptions.hansenPercentage !== hansenPercentageOnPreviousMapDraw.current

    layers.forEach(({ key: mapLayerKey }) => {
      if (forestOptions.selected.includes(mapLayerKey)) {
        // Layer is selected so ensure it's shown on map
        const isHansen = mapLayerKey === ForestSource.Hansen
        const key = mapLayerKey + (isHansen ? `__${forestOptions.hansenPercentage}` : '')

        // If the layer is pending or has failed, do not fetch it again.
        const isPendingLayer = forestOptions.pendingLayers[key]
        if (isPendingLayer) return
        const isFailedLayer = forestOptions.failedLayers[key]
        if (isFailedLayer) return

        const mapId = forestOptions.fetchedLayers[key]
        if (mapId) {
          // Cache hit, use cached value
          const overwrite = isHansen && hansenPercentageHasChanged
          if (overwrite) {
            hansenPercentageOnPreviousMapDraw.current = forestOptions.hansenPercentage
          }
          mapControllerRef.current.addEarthEngineLayer(mapLayerKey, mapId, overwrite)
          const opacity = opacities.current[mapLayerKey] !== undefined ? opacities.current[mapLayerKey] : 1
          mapControllerRef.current.setEarthEngineLayerOpacity(mapLayerKey, opacity)
        } else {
          // Cache miss, fetch layer from server
          const source: ForestSourceWithOptions = {
            key: mapLayerKey,
            options: isHansen ? { gteHansenTreeCoverPerc: forestOptions.hansenPercentage.toString() } : {},
          }
          const params: any = {
            countryIso,
            forestSource: mapLayerKey,
          }

          Object.entries(source.options).forEach(([key, value]) => {
            params[key] = value
          })

          const uri = axios.getUri({ url: ApiEndPoint.Geo.Layers.forest(), params })

          dispatch(getForestLayer({ key, uri }))
          // Once getForestLayer is ready, the fetched mapId will be added to fetchedLayers,
          // retriggering this effect and leading to a cache hit.
        }
      } else {
        // Layer is not selected so ensure it's not shown on map
        mapControllerRef.current.removeEarthEngineLayer(mapLayerKey)
      }
    })
  }, [
    countryIso,
    mapControllerRef,
    prevCountryIso,
    forestOptions.selected,
    forestOptions.hansenPercentage,
    forestOptions.fetchedLayers,
    forestOptions.failedLayers,
    forestOptions.pendingLayers,
    dispatch,
  ])
}

const useHandleAgreementLayer = (mapControllerRef: React.MutableRefObject<MapController>) => {
  const dispatch = useAppDispatch()
  const forestOptions = useForestSourceOptions()
  const agreementLayerCache = useRef<{ [key: string]: Layer }>({})
  const agreementLayerKey = 'Agreement'
  const countryIso = useCountryIso()

  // Keep track of the opacity
  // Done this way to avoid having 'forestOptions.opacity' in the following dependency
  // arrays (which eslint demands, although it's not necessary in this case)
  const opacity = useRef(
    forestOptions.opacity[agreementLayerKey] !== undefined ? forestOptions.opacity[agreementLayerKey] : 1
  )
  useEffect(() => {
    opacity.current =
      forestOptions.opacity[agreementLayerKey] !== undefined ? forestOptions.opacity[agreementLayerKey] : 1
  }, [forestOptions.opacity])
  useEffect(() => {
    // If any of the dependencies changes and there is an existing agreement layer on the
    // map, the layer is no longer valid, so remove it. If there is no existing agreement
    // layer, it's still safe to call `removeEarthEngineLayer`, it'll just do nothing and
    // return `false`.
    mapControllerRef.current.removeEarthEngineLayer(agreementLayerKey)
    dispatch(GeoActions.resetAgreementPalette())

    // If less than two sources are selected or the agreement level is greater than the
    // number of selected layers, reset the agreement state.
    if (forestOptions.selected.length < 2 || forestOptions.agreementLevel > forestOptions.selected.length) {
      dispatch(GeoActions.resetAgreementLayer())
      return
    }

    // If the agreement layer is not selected, don't render anything.
    if (!forestOptions.agreementLayerSelected) {
      return
    }

    // Otherwise, fetch the new agreement layer and add it to the map.

    const layerQuery = forestOptions.selected.map((key) => `&layer=${key}`).join('')
    const agreementLevelQuery = `&gteAgreementLevel=${forestOptions.agreementLevel}`
    const hansenQuery = forestOptions.selected.includes(ForestSource.Hansen)
      ? `&gteHansenTreeCoverPerc=${forestOptions.hansenPercentage}`
      : ''
    const uri = `${ApiEndPoint.Geo.Layers.forestAgreement()}/?countryIso=${countryIso}${layerQuery}${agreementLevelQuery}${hansenQuery}`

    // Use cached mapId if available
    if (agreementLayerCache.current[uri]) {
      const { mapId, palette } = agreementLayerCache.current[uri]
      mapControllerRef.current.addEarthEngineLayer(agreementLayerKey, mapId)
      mapControllerRef.current.setEarthEngineLayerOpacity(agreementLayerKey, opacity.current)
      dispatch(GeoActions.setAgreementPalette(palette))
      return
    }

    // Otherwise, fetch a new map id from server and cache it for later use
    axios.get<Layer>(uri).then((response) => {
      const { mapId, palette } = response.data

      // Cache mapId for later use
      agreementLayerCache.current[uri] = { mapId, palette }

      // Render layer
      mapControllerRef.current.addEarthEngineLayer(agreementLayerKey, mapId)
      mapControllerRef.current.setEarthEngineLayerOpacity(agreementLayerKey, opacity.current)
      dispatch(GeoActions.setAgreementPalette(palette))
    })
  }, [
    countryIso,
    mapControllerRef,
    forestOptions.agreementLayerSelected,
    forestOptions.agreementLevel,
    forestOptions.selected,
    forestOptions.hansenPercentage,
    dispatch,
  ])
}

export const useMapLayersHandler = (map: google.maps.Map, mapControllerRef: React.MutableRefObject<MapController>) => {
  useHandleForestResourceLayers(map, mapControllerRef)
  useHandleAgreementLayer(mapControllerRef)
}

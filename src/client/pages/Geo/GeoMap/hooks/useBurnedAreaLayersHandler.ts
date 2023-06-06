import { useEffect, useRef } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { BurnedAreaKey } from 'meta/geo'

import { useAppDispatch } from 'client/store'
import { GeoActions, useBurnedAreasOptions, useIsGeoMapAvailable } from 'client/store/ui/geo'
import { getBurnedAreaLayer } from 'client/store/ui/geo/actions'
import { GetBurnedAreaLayerRequestBody } from 'client/store/ui/geo/actions/getBurnedAreaLayer'
import { useCountryIso, usePrevious } from 'client/hooks'
import { mapController } from 'client/utils'

import { burnedAreaLayers } from '../GeoMapMenuData/MapVisualizerPanel'

export const useBurnedAreaLayersHandler = () => {
  const countryIso = useCountryIso()
  const prevCountryIso = usePrevious(countryIso)
  const dispatch = useAppDispatch()
  const burnedAreasOptions = useBurnedAreasOptions()
  const isMapAvailable = useIsGeoMapAvailable()
  const selectedYearOnPreviousDraw = useRef<number>(burnedAreasOptions.applied.selectedYear)

  // Handle a change of country ISO
  useEffect(() => {
    // Run only when the Country ISO changes and there is a map available
    if (!isMapAvailable || prevCountryIso === countryIso) return

    burnedAreaLayers.forEach(({ key: mapLayerKey }) => {
      // Remove the layer from the map since it belongs to the previous country
      mapController.removeLayer(mapLayerKey)
    })
    // Since the country changed, all layers previously fetched need to be cleared
    // This will trigger the loading of the layers in the next useEffect
    dispatch(GeoActions.resetBurnedAreaLayersStates())
  }, [isMapAvailable, countryIso, prevCountryIso, dispatch])

  // Handle the cases where the state of the layers themselves change.
  useEffect(() => {
    // The country ISO switch was handled in the previous useEffect, so skip it here.
    if (prevCountryIso !== countryIso) return
    const selectedYearHasChanged = burnedAreasOptions.applied.selectedYear !== selectedYearOnPreviousDraw.current

    burnedAreaLayers.forEach(({ key: mapLayerKey }) => {
      // The layers should only be fetched when they are selected and have opacity greater than 0.
      if (burnedAreasOptions.selected.includes(mapLayerKey) && burnedAreasOptions.opacity[mapLayerKey] !== 0) {
        // Layer is selected so ensure it's shown on map
        const isMODIS = mapLayerKey === BurnedAreaKey.MODIS
        const key = mapLayerKey + (isMODIS ? `__${burnedAreasOptions.applied.selectedYear}` : '')
        // If the layer is pending or has failed, do not fetch it again.
        const isPendingLayer = burnedAreasOptions.pendingLayers[key]
        if (isPendingLayer) return
        const isFailedLayer = burnedAreasOptions.failedLayers[key]
        if (isFailedLayer) return

        const mapId = burnedAreasOptions.fetchedLayers[key]
        if (mapId) {
          // Cache hit, use cached value
          const overwrite = isMODIS && selectedYearHasChanged
          if (overwrite) {
            selectedYearOnPreviousDraw.current = burnedAreasOptions.applied.selectedYear
          }
          mapController.addEarthEngineLayer(mapLayerKey, mapId, overwrite)
          const opacity = burnedAreasOptions.opacity[mapLayerKey] !== undefined ? burnedAreasOptions.opacity[mapLayerKey] : 1
          mapController.setEarthEngineLayerOpacity(mapLayerKey, opacity)
        } else {
          // Cache miss, fetch layer from server
          const requestBody: GetBurnedAreaLayerRequestBody = {
            countryIso,
            layer: {
              key: mapLayerKey,
            },
          }

          if (isMODIS) {
            requestBody.layer.options = {
              year: burnedAreasOptions.applied.selectedYear,
            }
          }

          const uri = ApiEndPoint.Geo.Layers.burnedArea()

          dispatch(getBurnedAreaLayer({ key, uri, body: requestBody }))
          // Once getBurnedAreaLayer is ready, the fetched mapId will be added to fetchedLayers,
          // retriggering this effect and leading to a cache hit.
        }
      } else {
        // Layer is not selected so ensure it's not shown on map
        mapController.removeLayer(mapLayerKey)
      }
    })
  }, [
    countryIso,
    prevCountryIso,
    burnedAreasOptions.selected,
    burnedAreasOptions.fetchedLayers,
    burnedAreasOptions.failedLayers,
    burnedAreasOptions.pendingLayers,
    burnedAreasOptions.opacity,
    burnedAreasOptions.applied.selectedYear,
    dispatch,
  ])
}

export default useBurnedAreaLayersHandler

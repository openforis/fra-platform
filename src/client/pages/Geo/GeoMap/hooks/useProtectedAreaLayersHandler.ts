// import { useEffect } from 'react'

// import { ApiEndPoint } from 'meta/api/endpoint'
// import { ProtectedAreaKey } from 'meta/geo'

// import { useAppDispatch } from 'client/store'
// import { GeoActions, useIsGeoMapAvailable, useProtectedAreasOptions } from 'client/store/ui/geo'
// import { getProtectedAreaLayer } from 'client/store/ui/geo/actions'
// import { GetProtectedAreaLayerRequestBody } from 'client/store/ui/geo/actions/getProtectedAreaLayer'
// import { useCountryIso, usePrevious } from 'client/hooks'
// import { mapController } from 'client/utils'

// import { protectedAreaLayers } from '../GeoMapMenuData/MapVisualizerPanel'

// export const useProtectedAreaLayersHandler = () => {
//   const countryIso = useCountryIso()
//   const prevCountryIso = usePrevious(countryIso)
//   const dispatch = useAppDispatch()
//   const protectedAreasOptions = useProtectedAreasOptions()
//   const isMapAvailable = useIsGeoMapAvailable()

//   // Handle a change of country ISO
//   useEffect(() => {
//     // Run only when the Country ISO changes and there is a map available
//     if (!isMapAvailable || prevCountryIso === countryIso) return

//     protectedAreaLayers.forEach(({ key: mapLayerKey }) => {
//       // Remove the layer from the map since it belongs to the previous country
//       mapController.removeLayer(mapLayerKey)
//     })
//     // Since the country changed, all layers previously fetched need to be cleared
//     // This will trigger the loading of the layers in the next useEffect
//     dispatch(GeoActions.resetProtectedAreaLayersStates())
//   }, [isMapAvailable, countryIso, prevCountryIso, dispatch])

//   // Handle the cases where the state of the layers themselves change.
//   useEffect(() => {
//     // The country ISO switch was handled in the previous useEffect, so skip it here.
//     if (prevCountryIso !== countryIso) return

//     protectedAreaLayers.forEach(({ key: mapLayerKey }) => {
//       // The layers should only be fetched when they are selected and have opacity greater than 0.
//       if (protectedAreasOptions.selected.includes(mapLayerKey) && protectedAreasOptions.opacity[mapLayerKey] !== 0) {
//         // Layer is selected so ensure it's shown on map
//         const isWDPAAsset = mapLayerKey === ProtectedAreaKey.WDPA
//         const isCustomAsset = mapLayerKey === ProtectedAreaKey.CustomPA
//         const key = mapLayerKey

//         // If the layer is pending or has failed, do not fetch it again.
//         const isPendingLayer = protectedAreasOptions.pendingLayers[key]
//         if (isPendingLayer) return
//         const isFailedLayer = protectedAreasOptions.failedLayers[key]
//         if (isFailedLayer) return

//         const mapId = protectedAreasOptions.fetchedLayers[key]
//         if (mapId) {
//           // Cache hit, use cached value
//           if (isWDPAAsset) {
//             // mapController.addFeatureViewAssetLayer(mapLayerKey, mapId)
//           } else {
//             mapController.addEarthEngineLayer(mapLayerKey, mapId)
//           }
//           const opacity =
//             protectedAreasOptions.opacity[mapLayerKey] !== undefined ? protectedAreasOptions.opacity[mapLayerKey] : 1
//           mapController.setEarthEngineLayerOpacity(mapLayerKey, opacity)
//         } else {
//           // Cache miss, fetch layer from server
//           const requestBody: GetProtectedAreaLayerRequestBody = {
//             countryIso,
//             layer: {
//               key: mapLayerKey,
//             },
//           }

//           if (isCustomAsset) {
//             requestBody.layer.options = {
//               assetId: protectedAreasOptions.customAssetId,
//             }
//           }

//           const uri = ApiEndPoint.Geo.Layers.protectedArea()

//           dispatch(getProtectedAreaLayer({ key, uri, body: requestBody }))
//           // Once getProtectedAreaLayer is ready, the fetched mapId will be added to fetchedLayers,
//           // retriggering this effect and leading to a cache hit.
//         }
//       } else {
//         // Layer is not selected so ensure it's not shown on map
//         mapController.removeLayer(mapLayerKey)
//       }
//     })
//   }, [
//     countryIso,
//     prevCountryIso,
//     protectedAreasOptions.selected,
//     protectedAreasOptions.fetchedLayers,
//     protectedAreasOptions.failedLayers,
//     protectedAreasOptions.pendingLayers,
//     protectedAreasOptions.opacity,
//     protectedAreasOptions.customAssetId,
//     dispatch,
//   ])
// }

// export default useProtectedAreaLayersHandler

// import { useEffect, useRef } from 'react'

// import { ApiEndPoint } from 'meta/api/endpoint'
// import { ForestKey } from 'meta/geo'
// import { HansenPercentage } from 'meta/geo/forest'

// import { useAppDispatch } from 'client/store'
// import { GeoActions, useForestSourceOptions, useIsGeoMapAvailable } from 'client/store/ui/geo'
// import { getForestLayer } from 'client/store/ui/geo/actions'
// import { GetForestLayerRequestBody } from 'client/store/ui/geo/actions/getForestLayer'
// import { useCountryIso, usePrevious } from 'client/hooks'
// import { mapController } from 'client/utils'

// import { forestLayers } from '../GeoMapMenuData/MapVisualizerPanel'

// export const useForestLayersHandler = () => {
//   const countryIso = useCountryIso()
//   const prevCountryIso = usePrevious(countryIso)
//   const dispatch = useAppDispatch()
//   const forestOptions = useForestSourceOptions()
//   const hansenPercentageOnPreviousMapDraw = useRef<HansenPercentage>(forestOptions.hansenPercentage)
//   const isMapAvailable = useIsGeoMapAvailable()

//   // Keep track of the opacities to set them when the country switches
//   // Done this way to avoid having 'forestOptions.opacity' in the following dependency
//   // arrays (which eslint demands, although it's not necessary in this case)
//   const opacities = useRef(forestOptions.opacity)
//   useEffect(() => {
//     opacities.current = forestOptions.opacity
//   }, [forestOptions.opacity])

//   // Handle a change of country ISO
//   useEffect(() => {
//     // Run only when the Country ISO changes and there is a map available
//     if (!isMapAvailable || prevCountryIso === countryIso) return
//     forestLayers.forEach(({ key: mapLayerKey }) => {
//       // Remove the layer from the map since it belongs to the previous country
//       mapController.removeLayer(mapLayerKey)
//     })
//     // Since the country changed, all layers previously fetched need to be cleared
//     // This will trigger the loading of the layers in the next useEffect
//     dispatch(GeoActions.resetForestLayersStates())
//   }, [isMapAvailable, countryIso, prevCountryIso, dispatch])

//   // Handle the cases where the state of the layers themselves change.
//   useEffect(() => {
//     // The country ISO switch was handled in the previous useEffect, so skip it here.
//     if (prevCountryIso !== countryIso) return
//     const hansenPercentageHasChanged = forestOptions.hansenPercentage !== hansenPercentageOnPreviousMapDraw.current

//     forestLayers.forEach(({ key: mapLayerKey }) => {
//       // The layers should only be fetched when they are selected and have opacity greater than 0.
//       if (forestOptions.selected.includes(mapLayerKey) && forestOptions.opacity[mapLayerKey] !== 0) {
//         // Layer is selected so ensure it's shown on map
//         const isHansen = mapLayerKey === ForestKey.Hansen
//         const isCustomAsset = mapLayerKey === ForestKey.CustomFnF
//         const key = mapLayerKey + (isHansen ? `__${forestOptions.hansenPercentage}` : '')

//         // If the layer is pending or has failed, do not fetch it again.
//         const isPendingLayer = forestOptions.pendingLayers[key]
//         if (isPendingLayer) return
//         const isFailedLayer = forestOptions.failedLayers[key]
//         if (isFailedLayer) return

//         const mapId = forestOptions.fetchedLayers[key]
//         if (mapId) {
//           // Cache hit, use cached value
//           const overwrite = isHansen && hansenPercentageHasChanged
//           if (overwrite) {
//             hansenPercentageOnPreviousMapDraw.current = forestOptions.hansenPercentage
//           }
//           mapController.addEarthEngineLayer(mapLayerKey, mapId, overwrite)
//           const opacity = opacities.current[mapLayerKey] !== undefined ? opacities.current[mapLayerKey] : 1
//           mapController.setEarthEngineLayerOpacity(mapLayerKey, opacity)
//         } else {
//           // Cache miss, fetch layer from server
//           const requestBody: GetForestLayerRequestBody = {
//             countryIso,
//             layer: {
//               key: isHansen ? ForestKey.Hansen : mapLayerKey,
//             },
//           }
//           if (isHansen) {
//             requestBody.layer.options = {
//               gteTreeCoverPercent: forestOptions.hansenPercentage,
//             }
//           } else if (isCustomAsset) {
//             requestBody.layer.options = {
//               assetId: forestOptions.customAssetId,
//             }
//           }

//           const uri = ApiEndPoint.Geo.Layers.forest()

//           dispatch(getForestLayer({ key, uri, body: requestBody }))
//           // Once getForestLayer is ready, the fetched mapId will be added to fetchedLayers,
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
//     forestOptions.selected,
//     forestOptions.hansenPercentage,
//     forestOptions.fetchedLayers,
//     forestOptions.failedLayers,
//     forestOptions.pendingLayers,
//     forestOptions.opacity,
//     forestOptions.customAssetId,
//     dispatch,
//   ])
// }

// export default useForestLayersHandler

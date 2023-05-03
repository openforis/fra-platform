// import { useEffect, useRef } from 'react'

// import axios from 'axios'

// import { ApiEndPoint } from 'meta/api/endpoint'
// import { ForestKey, LayerConfig, LayerSource, LayerStatus } from 'meta/geo'

// import { useAppDispatch } from 'client/store'
// import { GeoActions, useForestSourceOptions } from 'client/store/ui/geo'
// import { GetForestLayerRequestBody } from 'client/store/ui/geo/actions/getForestLayer'
// import { useCountryIso } from 'client/hooks'
// import { mapController } from 'client/utils'

// export const useAgreementLayerHandler = () => {
//   const dispatch = useAppDispatch()
//   const forestOptions = useForestSourceOptions()
//   const agreementLayerCache = useRef<{ [key: string]: LayerConfig }>({})
//   const agreementLayerKey = 'Agreement'
//   const countryIso = useCountryIso()

//   // Keep track of the opacity
//   // Done this way to avoid having 'forestOptions.opacity' in the following dependency
//   // arrays (which eslint demands, although it's not necessary in this case)
//   const opacity = useRef(
//     forestOptions.opacity[agreementLayerKey] !== undefined ? forestOptions.opacity[agreementLayerKey] : 1
//   )
//   useEffect(() => {
//     opacity.current =
//       forestOptions.opacity[agreementLayerKey] !== undefined ? forestOptions.opacity[agreementLayerKey] : 1
//   }, [forestOptions.opacity])
//   useEffect(() => {
//     if (mapController.isMapUnavailable()) return
//     // If any of the dependencies changes and there is an existing agreement layer on the
//     // map, the layer is no longer valid, so remove it. If there is no existing agreement
//     // layer, it's still safe to call `removeLayer`, it'll just do nothing and
//     // return `false`.
//     mapController.removeLayer(agreementLayerKey)
//     dispatch(GeoActions.resetAgreementPalette())

//     // If less than two sources are selected or the agreement level is greater than the
//     // number of selected layers, reset the agreement state.
//     if (forestOptions.selected.length < 2 || forestOptions.agreementLevel > forestOptions.selected.length) {
//       dispatch(GeoActions.resetAgreementLayer())
//       return
//     }

//     // If the agreement layer is not selected, don't render anything.
//     if (!forestOptions.agreementLayerSelected) {
//       return
//     }

//     // Otherwise, fetch the new agreement layer and add it to the map.

//     const layerQuery = forestOptions.selected.map((key) => `&layer=${key}`).join('')
//     const agreementLevelQuery = `&gteAgreementLevel=${forestOptions.agreementLevel}`
//     const hansenQuery = forestOptions.selected.includes(ForestKey.Hansen)
//       ? `&gteHansenTreeCoverPerc=${forestOptions.hansenPercentage}`
//       : ''
//     const cacheKey = `${ApiEndPoint.Geo.Layers.forestAgreement()}/?countryIso=${countryIso}${layerQuery}${agreementLevelQuery}${hansenQuery}`

//     // Use cached mapId if available
//     if (agreementLayerCache.current[cacheKey]) {
//       const { mapId, palette } = agreementLayerCache.current[cacheKey]
//       mapController.addEarthEngineLayer(agreementLayerKey, mapId)
//       mapController.setEarthEngineLayerOpacity(agreementLayerKey, opacity.current)
//       dispatch(GeoActions.setAgreementPalette(palette))
//       return
//     }
//     const uri = ApiEndPoint.Geo.Layers.forestAgreement()

//     // Otherwise, fetch a new map id from server and cache it for later use
//     const layers: Array<LayerSource> = forestOptions.selected.map((key) => {
//       const isHansen = key === ForestKey.Hansen
//       const isCustomAsset = key === ForestKey.CustomFnF
//       const layer: LayerSource = {
//         key,
//       }
//       if (isHansen) {
//         layer.options = {
//           gteTreeCoverPercent: forestOptions.hansenPercentage,
//         }
//       } else if (isCustomAsset) {
//         layer.options = {
//           assetId: forestOptions.customAssetId,
//         }
//       }

//       return layer
//     })

//     const requestBody: GetForestLayerRequestBody = {
//       countryIso,
//       layers,
//       gteAgreementLevel: forestOptions.agreementLevel,
//     }
//     dispatch(GeoActions.setAgreementLayerStatus(LayerStatus.loading))
//     axios({ method: 'POST', url: uri, data: requestBody })
//       .then((response) => {
//         const { mapId, palette } = response.data

//         // Cache mapId for later use
//         agreementLayerCache.current[cacheKey] = { mapId, palette }

//         // Render layer
//         mapController.addEarthEngineLayer(agreementLayerKey, mapId)
//         mapController.setEarthEngineLayerOpacity(agreementLayerKey, opacity.current)
//         dispatch(GeoActions.setAgreementPalette(palette))
//         dispatch(GeoActions.setAgreementLayerStatus(LayerStatus.ready))
//       })
//       .catch(() => dispatch(GeoActions.setAgreementLayerStatus(LayerStatus.failed)))
//   }, [
//     countryIso,
//     forestOptions.agreementLayerSelected,
//     forestOptions.agreementLevel,
//     forestOptions.selected,
//     forestOptions.hansenPercentage,
//     forestOptions.customAssetId,
//     dispatch,
//   ])
// }

// export default useAgreementLayerHandler

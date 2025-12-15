// @ts-ignore

import { CountryIso } from 'meta/area/countryIso'
import { MapLayerKey } from 'meta/geo/map'

import { getCountryBounds } from 'client/pages/Geo/utils/countryBounds'

export class MapController {
  #map: google.maps.Map

  constructor(map: google.maps.Map = null) {
    this.#map = map
  }

  getMap(): google.maps.Map {
    return this.#map
  }

  setMap(map: google.maps.Map): void {
    this.#map = map
  }

  #getLayerIndex(mapLayerKey: MapLayerKey): number {
    return this.#map.overlayMapTypes.getArray().findIndex(({ name }) => name === mapLayerKey)
  }

  isMapUnavailable(): boolean {
    return this.#map === null
  }

  panToCountry(countryIso: CountryIso): void {
    getCountryBounds(countryIso).then((response) => {
      if (response?.data) {
        this.#map.panTo(response.data.centroid)
        this.#map.fitBounds(response.data.bounds)
      }
    })
  }

  addEarthEngineLayer(mapLayerKey: MapLayerKey, mapId: string, overwrite = false, tileUrl?: string): void {
    if (this.#map === null) return

    if (overwrite) {
      this.removeLayer(mapLayerKey)
    } else if (this.getLayer(mapLayerKey)) {
      return // avoid duplicates
    }

    // const tileSource = new ee.layers.EarthEngineTileSource({
    //   mapid: mapId,
    // })
    // const overlay = new ee.layers.ImageOverlay(tileSource, { name: mapLayerKey })
    // this.#map.overlayMapTypes.push(overlay)

    const eeLayer = new google.maps.ImageMapType({
      tileSize: new google.maps.Size(256, 256),
      name: mapId,
      getTileUrl: (coord, zoom): string => {
        return tileUrl.replace('{x}', String(coord.x)).replace('{y}', String(coord.y)).replace('{z}', String(zoom))
      },
    })

    this.#map.overlayMapTypes.push(eeLayer)

    // ee.Image(mapId)
    //   .getMap({ min: 0, max: 255 })
    //   .then((mapIdObject: { tile_fetcher: { url_format: any }; mapid: any }) => {
    //     // 2. Construct the tile URL
    //     const tileUrl = mapIdObject.tile_fetcher.url_format
    //
    //     // 3. Create and add a tile overlay
    //     // const map = new google.maps.Map(document.getElementById('map'), {
    //     //   center: { lat: 0, lng: 0 },
    //     //   zoom: 3,
    //     // })
    //
    //     const eeOverlay = new google.maps.ImageMapType({
    //       getTileUrl: (coord, zoom): string => {
    //         return tileUrl.replace('{x}', coord.x).replace('{y}', coord.y).replace('{z}', zoom)
    //       },
    //       tileSize: new google.maps.Size(256, 256),
    //       name: mapIdObject.mapid,
    //     })
    //     this.#map.overlayMapTypes.push(eeOverlay)
    //   })
  }

  // Render WDPA layer
  // addFeatureViewAssetLayer(mapLayerKey: string, mapId: any, overwrite = false): void {
  // }

  getLayer(mapLayerKey: MapLayerKey): google.maps.MapType | null {
    if (this.#map === null) return null
    const i = this.#getLayerIndex(mapLayerKey)
    return i >= 0 ? this.#map.overlayMapTypes.getAt(i) : null
  }

  removeLayer(mapLayerKey: MapLayerKey): boolean {
    if (this.#map === null) return false

    const i = this.#getLayerIndex(mapLayerKey)

    if (i < 0) return false

    this.#map.overlayMapTypes.removeAt(i)
    return true
  }

  setEarthEngineLayerOpacity(mapLayerKey: MapLayerKey, opacity: number): boolean {
    if (this.#map === null) return false
    // For some reason, `google.maps.MapType` type is lacking `setOpacity` so extend it here
    interface MapTypeWithSetOpacity extends google.maps.MapType {
      setOpacity: (opacity: number) => void
    }

    const layer = this.getLayer(mapLayerKey) as MapTypeWithSetOpacity

    if (!layer) return false

    layer.setOpacity(opacity)
    return true
  }

  addSepalLayer(mapLayerKey: MapLayerKey, urlTemplate: string): void {
    if (this.#map === null) return

    this.removeLayer(mapLayerKey) // prevent duplicates

    const layer = new google.maps.ImageMapType({
      name: mapLayerKey,
      getTileUrl: (coord: google.maps.Point, zoom: number): string => {
        const url = urlTemplate
          .replace('{x}', String(coord.x))
          .replace('{y}', String(coord.y))
          .replace('{z}', String(zoom))
        return url
      },
      tileSize: new google.maps.Size(256, 256),
      minZoom: 1,
      maxZoom: 20,
    })
    // Insert at index 0 so it doesn't overlay the other layers.
    this.#map.overlayMapTypes.insertAt(0, layer)
  }

  addOrUpdateEarthEngineLayer(
    mapLayerKey: MapLayerKey,
    mapId: string,
    opacity: number,
    overwrite = false,
    tileUrl?: string
  ): void {
    if (mapId && opacity > 0) {
      this.addEarthEngineLayer(mapLayerKey, mapId, overwrite, tileUrl)
      this.setEarthEngineLayerOpacity(mapLayerKey, opacity)
    } else {
      this.removeLayer(mapLayerKey)
    }
  }
}

export const mapController = new MapController()

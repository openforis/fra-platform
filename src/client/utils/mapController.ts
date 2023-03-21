// @ts-ignore
import ee from '@google/earthengine'

export class MapController {
  map: google.maps.Map

  #getLayerIndex(mapLayerKey: string): number {
    return this.map.overlayMapTypes.getArray().findIndex(({ name }) => name === mapLayerKey)
  }

  constructor(map: google.maps.Map) {
    this.map = map
  }

  addEarthEngineLayer(mapLayerKey: string, mapId: string, overwrite = false): void {
    if (overwrite) {
      this.removeLayer(mapLayerKey)
    } else if (this.getLayer(mapLayerKey)) {
      return // avoid duplicates
    }

    const tileSource = new ee.layers.EarthEngineTileSource({
      mapid: mapId,
    })
    const overlay = new ee.layers.ImageOverlay(tileSource, { name: mapLayerKey })
    this.map.overlayMapTypes.push(overlay)
    // map.panToBounds(new google.maps.LatLngBounds(countryBoundingBoxes["FI"])) // bound to box
  }

  getLayer(mapLayerKey: string): google.maps.MapType | null {
    const i = this.#getLayerIndex(mapLayerKey)
    return i >= 0 ? this.map.overlayMapTypes.getAt(i) : null
  }

  removeLayer(mapLayerKey: string): boolean {
    if (!this.map) return false

    const i = this.#getLayerIndex(mapLayerKey)

    if (i < 0) return false

    this.map.overlayMapTypes.removeAt(i)
    return true
  }

  setEarthEngineLayerOpacity(mapLayerKey: string, opacity: number): boolean {
    // For some reason, `google.maps.MapType` type is lacking `setOpacity` so extend it here
    interface MapTypeWithSetOpacity extends google.maps.MapType {
      setOpacity: (opacity: number) => void
    }

    const layer = this.getLayer(mapLayerKey) as MapTypeWithSetOpacity

    if (!layer) return false

    layer.setOpacity(opacity)
    return true
  }

  addSepalLayer(mapLayerKey: string, urlTemplate: string) {
    if (this.getLayer(mapLayerKey)) return // prevent duplicates

    const layer = new google.maps.ImageMapType({
      name: mapLayerKey,
      getTileUrl: (coord: google.maps.Point, zoom: number) => {
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
    this.map.overlayMapTypes.insertAt(0, layer)
  }
}

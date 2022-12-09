// @ts-ignore
import ee from '@google/earthengine'

export class MapController {
  map: google.maps.Map

  #getEarthEngineLayerIndex(mapLayerKey: string): number {
    return this.map.overlayMapTypes.getArray().findIndex(({ name }) => name === mapLayerKey)
  }

  constructor(map: google.maps.Map) {
    this.map = map
  }

  addEarthEngineLayer(mapLayerKey: string, mapId: string): void {
    const tileSource = new ee.layers.EarthEngineTileSource({
      mapid: mapId,
    })
    const overlay = new ee.layers.ImageOverlay(tileSource, { name: mapLayerKey })
    this.map.overlayMapTypes.push(overlay)
    // map.panToBounds(new google.maps.LatLngBounds(countryBoundingBoxes["FI"])) // bound to box
  }

  getEarthEngineLayer(mapLayerKey: string): google.maps.MapType | null {
    const i = this.#getEarthEngineLayerIndex(mapLayerKey)
    return i >= 0 ? this.map.overlayMapTypes.getAt(i) : null
  }

  removeEarthEngineLayer(mapLayerKey: string): boolean {
    const i = this.#getEarthEngineLayerIndex(mapLayerKey)

    if (i < 0) return false

    this.map.overlayMapTypes.removeAt(i)
    return true
  }

  setEarthEngineLayerOpacity(mapLayerKey: string, opacity: number): boolean {
    // For some reason, `google.maps.MapType` type is lacking `setOpacity` so extend it here
    interface MapTypeWithSetOpacity extends google.maps.MapType {
      setOpacity: (opacity: number) => void
    }

    const layer = this.getEarthEngineLayer(mapLayerKey) as MapTypeWithSetOpacity

    if (!layer) return false

    layer.setOpacity(opacity)
    return true
  }
}

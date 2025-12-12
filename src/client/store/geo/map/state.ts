export type GeoMapOptions = {
  mapTypeId: google.maps.MapTypeId
  maxZoom: number
  minZoom: number
  zoom: number
}

export type GeoMapState = {
  options: GeoMapOptions
}

export const initialState: GeoMapState = {
  options: {
    mapTypeId: 'satellite' as google.maps.MapTypeId,
    maxZoom: 15,
    minZoom: 3,
    zoom: 6,
  },
}

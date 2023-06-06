import { CountryIso } from 'meta/area'

export interface BoundsData {
  bounds: { south: number; west: number; north: number; east: number }
  centroid: { lat: number; lng: number }
}

export interface Bounds {
  countryIso: CountryIso
  data: BoundsData
}

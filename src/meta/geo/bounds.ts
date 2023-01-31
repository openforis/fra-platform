import { CountryIso } from '@meta/area'

export interface BoundsData {
  bounds: { south: number; west: number; north: number; east: number }
  centroid: { lat: number; lng: number }
}

export interface Bounds {
  countryIso: CountryIso
  data: BoundsData
}

// Default bounds (Finland)
export const defaultBounds: BoundsData = {
  centroid: { lat: 64.24788735018595, lng: 26.17394571572606 },
  bounds: {
    south: 59.76757880831121,
    west: 20.54889762519719,
    north: 70.09184694683972,
    east: 31.58709910567929,
  },
}

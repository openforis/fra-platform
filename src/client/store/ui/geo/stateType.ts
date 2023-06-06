import { CountryIso } from 'meta/area'
import { BurnedAreasOptions, ForestOptions, GeoStatisticsState, MapPanel, MosaicOptions, ProtectedAreasOptions } from 'meta/geo'

export type GeoState = {
  isMapAvailable: boolean
  selectedPanel: MapPanel
  forestOptions: ForestOptions
  mosaicOptions: {
    ui: MosaicOptions
    applied: MosaicOptions
    mosaicSelected: boolean
    mosaicPending: boolean
    mosaicFailed: boolean
    mosaicUrl: {
      [key in CountryIso]?: string
    }
  }
  geoStatistics: GeoStatisticsState
  protectedAreasOptions: ProtectedAreasOptions
  burnedAreasOptions: BurnedAreasOptions
}

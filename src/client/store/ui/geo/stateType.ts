import { CountryIso } from '@meta/area'
import { ForestOptions, GeoStatisticsState, MapPanel, MosaicOptions } from '@meta/geo'

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
}

import { CountryIso } from '@meta/area'
import { ForestOptions, MapPanel, MosaicOptions } from '@meta/geo'

export type GeoState = {
  isMapAvailable: boolean
  forestOptions: ForestOptions
  selectedPanel: MapPanel
  mosaicOptions: {
    ui: MosaicOptions
    applied: MosaicOptions
  }
  mosaicUrl: {
    [key in CountryIso]?: string
  }
  mosaicSelected: boolean
  mosaicPending: boolean
  mosaicFailed: boolean
}

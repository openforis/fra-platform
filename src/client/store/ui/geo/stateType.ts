import { ForestOptions, MapPanel, MosaicOptions } from '@meta/geo'

export interface GeoState {
  forestOptions: ForestOptions
  selectedPanel: MapPanel
  mosaicOptions: {
    ui: MosaicOptions
    applied: MosaicOptions
  }
  mosaicUrl: string
  mosaicSelected: boolean
}

import { ForestOptions, MapPanel, MosaicOptions } from '@meta/geo'

export interface GeoState {
  forestOptions: ForestOptions
  selectedPanel: MapPanel
  mosaicOptions: MosaicOptions
  mosaicUrl: string
  mosaicSelected: boolean
}

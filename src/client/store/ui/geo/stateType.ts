import { ForestOptions, ForestSource, ForestSources, MapPanel, MosaicOptions } from '@meta/geo'

export interface GeoState {
  forestSources: ForestSources
  forestOptions: ForestOptions
  selectedForestSource: ForestSource
  selectedPanel: MapPanel
  mosaicOptions: MosaicOptions
  mosaicUrl: string
}

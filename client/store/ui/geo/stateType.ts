import { MosaicOptions, MapPanel } from '@meta/geo'

export interface GeoState {
  selectedPanel: MapPanel
  mosaicOptions: MosaicOptions
  mosaicUrl: string
}

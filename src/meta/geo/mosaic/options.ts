import { MosaicSource } from 'meta/geo/mosaic/source'

export interface MosaicOptions {
  maxCloudCoverage: number
  snowMasking: boolean
  sources: Partial<Record<MosaicSource, boolean>>
  year: number
}

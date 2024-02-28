export interface MosaicOptions {
  sources: MosaicSource[]
  year: number
  maxCloudCoverage: number
}

export type MosaicSource = 'sentinel' | 'landsat'

export type MosaicLayerKey = 'mosaic'

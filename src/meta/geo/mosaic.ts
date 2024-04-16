export interface MosaicOptions {
  sources: MosaicSource[]
  year: number
  maxCloudCoverage: number
}

export type MosaicSource = 'sentinel' | 'landsat'

export type MosaicLayerKey = 'mosaic'

export type MosaicYearRange = {
  endYear: number
  startYear: number
}

export const mosaicYearRange: MosaicYearRange = {
  endYear: 2024,
  startYear: 2000,
}

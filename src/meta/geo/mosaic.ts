export interface MosaicOptions {
  maxCloudCoverage: number
  snowMasking: boolean
  sources: Partial<Record<MosaicSource, boolean>>
  year: number
}

export type MosaicSource = 'sentinel' | 'landsat'

export const MOSAIC_LAYER_KEY = 'mosaic' as const

export type MosaicLayerKey = typeof MOSAIC_LAYER_KEY

export type MosaicYearRange = {
  endYear: number
  startYear: number
}

export const mosaicYearRange: MosaicYearRange = {
  endYear: 2024,
  startYear: 2000,
}

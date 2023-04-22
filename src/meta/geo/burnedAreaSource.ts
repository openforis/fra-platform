export enum BurnedAreaKey {
  MODIS = 'MODIS',
}

export const burnedAreaLayersMetadata = {
  [BurnedAreaKey.MODIS]: {
    palette: ['#FF0000'],
    scale: 500,
  },
}

export interface BurnedAreasUIOptions {
  startYear: number
  endYear: number
  selectedYear: number
}

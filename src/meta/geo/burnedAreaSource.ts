export enum BurnedAreaKey {
  MODIS = 'MODIS',
}

export const burnedAreaSourcesMetadata = {
  [BurnedAreaKey.MODIS]: {
    palette: ['#FF0000'],
    scale: 500,
  },
}

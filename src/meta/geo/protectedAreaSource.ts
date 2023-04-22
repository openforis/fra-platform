export enum ProtectedAreaKey {
  FilteredWDPA = 'FilteredWDPA',
  WDPA = 'WDPA',
  CustomPA = 'CustomPA',
}

export const protectedAreaLayersMetadata = {
  [ProtectedAreaKey.FilteredWDPA]: {
    palette: ['#0f9ba6'],
    scale: 30,
  },
  [ProtectedAreaKey.WDPA]: {
    palette: ['#2ed033'],
    scale: 0,
  },
  [ProtectedAreaKey.CustomPA]: {
    palette: ['#f6e594'],
    scale: 0,
  },
}

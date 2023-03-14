export enum ProtectedAreaSource {
  WDPA = 'WDPA',
  FilteredWDPA = 'FilteredWDPA',
  Custom = 'Custom',
}

export const protectedAreaSourcesMetadata = {
  [ProtectedAreaSource.FilteredWDPA]: {
    scale: 30,
    palette: ['#0f9ba6'],
  },
  [ProtectedAreaSource.Custom]: {
    palette: ['#f6e594'],
  },
  [ProtectedAreaSource.WDPA]: {
    palette: ['#2ed033'],
    conf: {
      assetId: 'WCMC/WDPA/current/polygons_FeatureView',
      visParams: {
        color: {
          property: 'REP_AREA',
          mode: 'linear',
          palette: ['2ed033', '5aff05', '67b9ff', '5844ff', '0a7618', '2c05ff'],
          min: 0.0,
          max: 1550000.0,
        },
        opacity: 0.8,
      },
    },
  },
}

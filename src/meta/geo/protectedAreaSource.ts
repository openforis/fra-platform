import { LayerMetadata, LayerSection, LayerSectionKey } from './layer'

export enum ProtectedAreaKey {
  FilteredWDPA = 'FilteredWDPA',
  WDPA = 'WDPA',
  CustomPA = 'CustomPA',
}

export const protectedAreaLayersMetadata: Record<ProtectedAreaKey, LayerMetadata> = {
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

export const protectedAreaLayers: LayerSection = {
  key: LayerSectionKey.ProtectedArea,
  layers: [
    {
      key: ProtectedAreaKey.FilteredWDPA,
      metadata: protectedAreaLayersMetadata.FilteredWDPA,
    },
    {
      key: ProtectedAreaKey.WDPA,
      metadata: protectedAreaLayersMetadata.WDPA,
    },
    {
      key: ProtectedAreaKey.CustomPA,
      isCustomAsset: true,
      metadata: protectedAreaLayersMetadata.CustomPA,
    },
  ],
}

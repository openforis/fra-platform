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
    title: 'Filtered WDPA',
  },
  [ProtectedAreaKey.WDPA]: {
    palette: ['#2ed033'],
    scale: 0,
    title: 'WDPA',
  },
  [ProtectedAreaKey.CustomPA]: {
    palette: ['#f6e594'],
    scale: 0,
    title: 'Custom Protected Area',
  },
}

export const protectedAreaLayers: LayerSection = {
  key: LayerSectionKey.ProtectedArea,
  title: 'Protected Area Layers',
  layers: [
    {
      key: ProtectedAreaKey.FilteredWDPA,
      metadata: protectedAreaLayersMetadata.FilteredWDPA,
    },
    // {
    //   key: ProtectedAreaKey.WDPA, // <- Layer not yet implemented in the backend
    //   metadata: protectedAreaLayersMetadata.WDPA,
    // },
    {
      key: ProtectedAreaKey.CustomPA,
      isCustomAsset: true,
      metadata: protectedAreaLayersMetadata.CustomPA,
    },
  ],
}

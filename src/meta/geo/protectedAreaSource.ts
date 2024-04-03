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
    titleKey: 'geo.sections.protectedArea.layerTitles.filteredWdpa',
  },
  [ProtectedAreaKey.WDPA]: {
    palette: ['#2ed033'],
    scale: 0,
    titleKey: 'geo.sections.protectedArea.layerTitles.wdpa',
  },
  [ProtectedAreaKey.CustomPA]: {
    palette: ['#d5c266'],
    scale: 0,
    titleKey: 'geo.sections.protectedArea.layerTitles.customProtectedArea',
  },
}

export const protectedAreaLayers: LayerSection = {
  key: LayerSectionKey.ProtectedArea,
  titleKey: 'geo.sections.protectedArea.title',
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

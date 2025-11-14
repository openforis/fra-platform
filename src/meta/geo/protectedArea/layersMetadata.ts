import { LayerMetadata } from 'meta/geo/layer/metadata'
import { ProtectedAreaKey } from 'meta/geo/protectedArea/key'

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

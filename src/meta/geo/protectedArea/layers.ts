import { LayerSection } from 'meta/geo/layer/section'
import { LayerSectionKey } from 'meta/geo/layer/sectionKey'
import { ProtectedAreaKey } from 'meta/geo/protectedArea/key'
import { protectedAreaLayersMetadata } from 'meta/geo/protectedArea/layersMetadata'

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

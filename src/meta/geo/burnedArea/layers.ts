import { Arrays } from 'utils/arrays'

import { BurnedAreaKey } from 'meta/geo/burnedArea/key'
import { burnedAreaLayersMetadata } from 'meta/geo/burnedArea/layersMetadata'
import { LayerSection } from 'meta/geo/layer/section'
import { LayerSectionKey } from 'meta/geo/layer/sectionKey'

export const burnedAreaLayers: LayerSection = {
  key: LayerSectionKey.BurnedArea,
  titleKey: 'geo.sections.burnedArea.title',
  layers: [
    {
      key: BurnedAreaKey.MODIS_FIRE,
      options: { years: Arrays.range(2000, new Date().getFullYear() + 1, 1) },
      metadata: burnedAreaLayersMetadata.MODIS_FIRE,
    },
  ],
}

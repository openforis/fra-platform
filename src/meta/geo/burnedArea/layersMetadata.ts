import { BurnedAreaKey } from 'meta/geo/burnedArea/key'
import { LayerMetadata } from 'meta/geo/layer/metadata'

export const burnedAreaLayersMetadata: Record<BurnedAreaKey, LayerMetadata> = {
  [BurnedAreaKey.MODIS_FIRE]: {
    palette: ['#980101'],
    scale: 500,
    titleKey: 'geo.sections.burnedArea.layerTitles.modis',
  },
}

import { Arrays } from '@utils/arrays'

import { LayerMetadata, LayerSection, LayerSectionKey } from './layer'

export enum BurnedAreaKey {
  MODIS_FIRE = 'MODIS_FIRE',
}

export const burnedAreaLayersMetadata: Record<BurnedAreaKey, LayerMetadata> = {
  [BurnedAreaKey.MODIS_FIRE]: {
    palette: ['#FF0000'],
    scale: 500,
  },
}

export const burnedAreaLayers: LayerSection = {
  key: LayerSectionKey.BurnedArea,
  layers: [
    {
      key: BurnedAreaKey.MODIS_FIRE,
      options: { years: Arrays.range(2000, new Date().getFullYear() + 1, 1) },
    },
  ],
}

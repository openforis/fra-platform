import { Arrays } from '@utils/arrays'

import { LayerMetadata, LayerSection, LayerSectionKey } from './layer'

export enum BurnedAreaKey {
  MODIS = 'MODIS',
}

export const burnedAreaLayersMetadata: Record<BurnedAreaKey, LayerMetadata> = {
  [BurnedAreaKey.MODIS]: {
    palette: ['#FF0000'],
    scale: 500,
  },
}

export const burnedAreaLayers: LayerSection = {
  key: LayerSectionKey.BurnedArea,
  layers: [
    {
      key: BurnedAreaKey.MODIS,
      options: { years: Arrays.range(2000, new Date().getFullYear() + 1, 1) },
    },
  ],
}

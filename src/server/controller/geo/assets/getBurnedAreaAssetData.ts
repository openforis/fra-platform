// @ts-ignore
import { Filter, Image, ImageCollection, Reducer } from '@google/earthengine'

import { BurnedAreaKey, burnedAreaLayersMetadata, LayerSource } from 'meta/geo'

export const getBurnedAreaAssetData = (layer: LayerSource): { year?: number; img: Image; metadata: any } => {
  let asset = {} as { year?: number; img: Image; metadata: any }

  switch (layer.key) {
    case BurnedAreaKey.MODIS: {
      const imcMODIS = ImageCollection('MODIS/061/MCD64A1').filter(
        Filter.date(`${layer.options.year}-01-01`, `${layer.options.year}-12-31`)
      )

      const imgMODIS = imcMODIS.select('BurnDate').reduce(Reducer.anyNonZero()).select(0)

      asset = {
        year: layer.options.year,
        img: imgMODIS,
        metadata: burnedAreaLayersMetadata[layer.key],
      }
      break
    }

    default:
      return null
  }

  return asset
}

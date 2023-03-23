// @ts-ignore
import { Filter, Image, ImageCollection, Reducer } from '@google/earthengine'

import { BurnedAreaKey, BurnedAreaLayerSource } from '@meta/geo'

export const getBurnedAreaAssetData = (layer: BurnedAreaLayerSource): { year?: number; img: Image } => {
  let asset = {} as { year?: number; img: Image }

  switch (layer.key) {
    case BurnedAreaKey.MODIS: {
      const imcMODIS = ImageCollection('MODIS/061/MCD64A1').filter(
        Filter.date(`${layer.options.year}-01-01`, `${layer.options.year}-12-31`)
      )

      const imgMODIS = imcMODIS.select('BurnDate').reduce(Reducer.anyNonZero()).select(0)

      asset = {
        year: layer.options.year,
        img: imgMODIS,
      }
      break
    }

    default:
      return null
  }

  return asset
}

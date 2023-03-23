// @ts-ignore
import { Image } from '@google/earthengine'

import { ProtectedAreaKey, ProtectedAreaLayerSource } from '@meta/geo'

export const getProtectedAreaAssetData = (layer: ProtectedAreaLayerSource): { year?: number; img: Image } => {
  let asset = {} as { year?: number; img: Image }

  switch (layer.key) {
    case ProtectedAreaKey.FilteredWDPA: {
      const imgFilteredWDPA = Image('users/geofra/protected_areas/PAs_WDPA_polygons_filtered_image_Bin_30m_World_v2')
        .eq(1)
        .selfMask()

      asset = {
        year: 2017,
        img: imgFilteredWDPA,
      }
      break
    }

    case ProtectedAreaKey.CustomPA: {
      const imgCustom = Image(layer.options.assetId).select(0).eq(1)

      asset = {
        img: imgCustom,
      }
      break
    }

    default:
      return null
  }

  return asset
}

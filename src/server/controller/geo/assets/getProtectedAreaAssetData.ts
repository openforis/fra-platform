// @ts-ignore
import { Image } from '@google/earthengine'

import { LayerSource, ProtectedAreaKey, protectedAreaSourcesMetadata } from '@meta/geo'

export const getProtectedAreaAssetData = (layer: LayerSource): { year?: number; img: Image; metadata: any } => {
  let asset = {} as { year?: number; img: Image; metadata: any }

  switch (layer.key) {
    case ProtectedAreaKey.FilteredWDPA: {
      const imgFilteredWDPA = Image('users/geofra/protected_areas/v1/PAs_WDPA_Bin_30m_World_2020').eq(1).selfMask()

      asset = {
        year: 2020,
        img: imgFilteredWDPA,
        metadata: protectedAreaSourcesMetadata[layer.key],
      }
      break
    }

    case ProtectedAreaKey.CustomPA: {
      const imgCustom = Image(layer.options.assetId).select(0).eq(1)

      asset = {
        img: imgCustom,
        metadata: protectedAreaSourcesMetadata[layer.key],
      }
      break
    }

    default:
      return null
  }

  return asset
}

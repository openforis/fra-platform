// @ts-ignore
import { FeatureCollection, Image } from '@google/earthengine'

import { LayerSource } from 'meta/geo/layer/source'
import { ProtectedAreaKey } from 'meta/geo/protectedArea/key'
import { protectedAreaLayersMetadata } from 'meta/geo/protectedArea/layersMetadata'

export const getProtectedAreaAssetData = (layer: LayerSource): { year?: number; img: Image; metadata: any } => {
  switch (layer.key) {
    case ProtectedAreaKey.FilteredWDPA: {
      const imgFilteredWDPA = Image('users/geofra/protected_areas/v1/PAs_WDPA_Bin_30m_World_2020').eq(1)

      return {
        year: 2020,
        img: imgFilteredWDPA,
        metadata: protectedAreaLayersMetadata[layer.key],
      }
    }
    case ProtectedAreaKey.WDPA: {
      const ftcWDPAPolygons = FeatureCollection('WCMC/WDPA/current/polygons')

      return {
        img: ftcWDPAPolygons.style({ color: '#6666FF', fillColor: '6666FF30', width: 1.5 }),
        metadata: protectedAreaLayersMetadata[layer.key],
      }
    }
    case ProtectedAreaKey.CustomPA: {
      const imgCustom = Image(layer.options.assetId).select(0).eq(1)

      return {
        img: imgCustom,
        metadata: protectedAreaLayersMetadata[layer.key],
      }
    }

    default:
      return null
  }
}

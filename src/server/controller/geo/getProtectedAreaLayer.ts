// @ts-ignore
import { data } from '@google/earthengine'

import { CountryIso } from '@meta/area'
import { LayerConfig, LayerSource, ProtectedAreaKey } from '@meta/geo'

import { AssetsController } from '@server/controller/geo/assets'

import { getMap } from './getMap'

type Props = {
  countryIso: CountryIso
  layer: LayerSource
}

export const getProtectedAreaLayer = async (props: Props): Promise<LayerConfig> => {
  const { countryIso, layer } = props

  const asset = AssetsController.getProtectedAreaAssetData(layer)

  switch (layer.key) {
    case ProtectedAreaKey.FilteredWDPA:
    case ProtectedAreaKey.CustomPA: {
      const map = await getMap({
        image: asset.img,
        style: {
          palette: asset.metadata.palette,
        },
        countryIso,
      })

      return {
        mapId: map.mapId,
        year: asset.year,
        scale: asset.metadata.scale,
        palette: asset.metadata.palette,
      }
    }

    case ProtectedAreaKey.WDPA: {
      return new Promise((resolve, reject) => {
        data.getFeatureViewTilesKey(
          {
            assetId: 'WCMC/WDPA/current/polygons_FeatureView',
            visParams: {
              color: {
                property: 'REP_AREA',
                mode: 'linear',
                palette: ['2ed033', '5aff05', '67b9ff', '5844ff', '0a7618', '2c05ff'],
                min: 0.0,
                max: 1550000.0,
              },
              opacity: 0.8,
            },
          },
          (featureViewTilesKey: any, err: any) => {
            if (err) {
              reject(err)
              return
            }
            resolve({
              mapId: featureViewTilesKey,
              palette: ['#2c05ff'],
            })
          }
        )
      })
    }
    default:
      return null
  }
}

// @ts-ignore
import { data } from '@google/earthengine'

import { CountryIso } from '@meta/area'
import { Layer, ProtectedAreaSource, protectedAreaSourcesMetadata } from '@meta/geo'

import { AssetsController } from '@server/controller/geo/assets'

type Props = {
  countryIso: CountryIso
  source: ProtectedAreaSource
  params?: { assetId: string }
}

export const getProtectedAreaLayer = async (props: Props): Promise<Layer> => {
  const { source } = props

  switch (source) {
    case ProtectedAreaSource.FilteredWDPA:
    case ProtectedAreaSource.Custom: {
      const asset = AssetsController.getProtectedAreaAssetData(props)
      return new Promise((resolve, reject) => {
        asset.img.getMap(
          {
            palette: protectedAreaSourcesMetadata[source].palette,
          },
          (mapProperties: any, err: any) => {
            if (err) {
              reject(err)
              return
            }
            resolve({
              mapId: mapProperties.mapid,
              palette: protectedAreaSourcesMetadata[source].palette,
            })
          }
        )
      })
    }

    case ProtectedAreaSource.WDPA: {
      return new Promise((resolve, reject) => {
        data.getFeatureViewTilesKey(
          protectedAreaSourcesMetadata[ProtectedAreaSource.WDPA].conf,
          (featureViewTilesKey: any, err: any) => {
            if (err) {
              reject(err)
              return
            }
            resolve({
              mapId: featureViewTilesKey,
              palette: protectedAreaSourcesMetadata[ProtectedAreaSource.WDPA].palette,
            })
          }
        )
      })
    }
    default:
      return null
  }
}

import { CountryIso } from '@meta/area'
import { Layer, LayerSource, sourcesMetadata } from '@meta/geo'

import { AssetsController } from '@server/controller/geo/assets'

type Props = {
  countryIso: CountryIso
  layer: LayerSource
}

export const getForestLayer = async (props: Props): Promise<Layer> => {
  const { countryIso, layer } = props

  const ftcCountry = AssetsController.getCountryBoundaries(countryIso)
  const asset = AssetsController.getForestAssetData(layer)
  const metadata = sourcesMetadata[layer.key]

  return new Promise((resolve, reject) => {
    asset.img
      .clip(ftcCountry)
      .selfMask()
      .getMap(
        {
          palette: metadata.palette,
        },
        (mapProperties: any, err: any) => {
          if (err) {
            reject(err)
            return
          }
          resolve({
            mapId: mapProperties.mapid,
            year: asset.year,
            scale: metadata.scale,
            palette: metadata.palette,
            citation: metadata.citation,
          })
        }
      )
  })
}

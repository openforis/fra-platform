import { CountryIso } from '@meta/area'
import { ForestSource, Layer, sourcesMetadata } from '@meta/geo'

import { AssetsController } from '@server/controller/geo/assets'

// import { authenticateToGee } from './authenticateToGee'

type Props = {
  countryIso: CountryIso
  forestSource: ForestSource
  gteHansenTreeCoverPerc?: number
  onlyProtected?: boolean
  opacity?: number
}

export const getForestLayer = async (props: Props): Promise<Layer> => {
  const { countryIso, forestSource, gteHansenTreeCoverPerc, onlyProtected, opacity } = props

  const ftcCountry = AssetsController.getCountryBoundaries(countryIso)
  const asset = AssetsController.getForestAssetData(forestSource, gteHansenTreeCoverPerc, onlyProtected)
  const metadata = sourcesMetadata[forestSource]

  return new Promise((resolve, reject) => {
    asset.img
      .clip(ftcCountry)
      .selfMask()
      .getMap(
        {
          palette: metadata.palette,
          opacity: opacity === undefined ? 1 : opacity,
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

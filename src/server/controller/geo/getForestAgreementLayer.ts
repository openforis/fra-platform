import { CountryIso } from '@meta/area'
import { agreementPalette, ForestSource, Layer } from '@meta/geo'

import { AssetsController } from '@server/controller/geo/assets/'

type Props = {
  countryIso: CountryIso
  layer: Array<ForestSource>
  gteHansenTreeCoverPerc?: number
  gteAgreementLevel: number
  opacity?: number
}

export const getForestAgreementLayer = async (props: Props): Promise<Layer> => {
  const { countryIso, layer, gteHansenTreeCoverPerc, gteAgreementLevel, opacity } = props

  const ftcCountry = AssetsController.getCountryBoundaries(countryIso)
  const asset = AssetsController.getForestAgreementAssetData(layer, gteHansenTreeCoverPerc, gteAgreementLevel)
  const palette = agreementPalette.slice(gteAgreementLevel - 1, layer.length)

  return new Promise((resolve, reject) => {
    asset.img
      .clip(ftcCountry)
      .selfMask()
      .getMap(
        {
          palette,
          min: gteAgreementLevel,
          max: palette.length,
          opacity,
        },
        (mapProperties: any, err: any) => {
          if (err) {
            reject(err)
            return
          }
          resolve({
            mapId: mapProperties.mapid,
            palette,
          })
        }
      )
  })
}

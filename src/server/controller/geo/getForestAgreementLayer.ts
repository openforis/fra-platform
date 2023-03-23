import { CountryIso } from '@meta/area'
import { agreementPalette, Layer, LayerSource } from '@meta/geo'

import { AssetsController } from '@server/controller/geo/assets/'

type Props = {
  countryIso: CountryIso
  layers: Array<LayerSource>
  gteAgreementLevel: number
}

export const getForestAgreementLayer = async (props: Props): Promise<Layer> => {
  const { countryIso, layers, gteAgreementLevel } = props

  const ftcCountry = AssetsController.getCountryBoundaries(countryIso)
  const asset = AssetsController.getForestAgreementAssetData(layers, gteAgreementLevel)
  const palette = agreementPalette.slice(gteAgreementLevel - 1, layers.length)

  return new Promise((resolve, reject) => {
    asset.img
      .clip(ftcCountry)
      .selfMask()
      .getMap(
        {
          palette,
          min: gteAgreementLevel,
          max: layers.length,
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

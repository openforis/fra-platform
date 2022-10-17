import { CountryIso } from '@meta/area'
import { agreementPalette, ForestSource, Layer } from '@meta/geo'

import { AssetsController } from '@server/controller/geo/assets/'

import { authenticateToGee } from './authenticateToGee'

type Props = {
  countryIso: CountryIso
  sourceLayers: Array<ForestSource>
  gteHansenTreeCoverPerc: number
  gteAgreementLevel: number
  opacity?: number
}

export const getForestAgreementLayer = async (props: Props): Promise<Layer> => {
  const { countryIso, sourceLayers, gteHansenTreeCoverPerc, gteAgreementLevel, opacity } = props

  await authenticateToGee()

  const ftcCountry = AssetsController.getCountryBoundaries(countryIso)
  const asset = AssetsController.getForestAgreementAssetData(sourceLayers, gteHansenTreeCoverPerc, gteAgreementLevel)
  const palette = agreementPalette.slice(gteAgreementLevel - 1, sourceLayers.length)

  return new Promise((resolve, reject) => {
    asset.img
      .clip(ftcCountry)
      .selfMask()
      .getMap(
        {
          palette,
          min: Number(gteAgreementLevel),
          max: palette.length,
          opacity: opacity === undefined ? 1 : Number(opacity),
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

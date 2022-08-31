import { CountryIso } from '@meta/area'
import { agreementPalette, Layer, precalForestAgreementSources } from '@meta/geo'

import { AssetsController } from '@server/controller/geo/assets/'

import { authenticateToGee } from './authenticateToGee'

type Props = {
  countryIso: CountryIso
  gteHansenTreeCoverPerc: number
  gteAgreementLevel: number
}

export const getForestAgreementLayer = async (props: Props): Promise<Layer> => {
  const { countryIso, gteHansenTreeCoverPerc, gteAgreementLevel } = props

  if (Number.isNaN(gteHansenTreeCoverPerc) || gteHansenTreeCoverPerc < 0 || gteHansenTreeCoverPerc > 100)
    throw Error(`Not valid Hansen tree cover percentage 0-100: ${gteHansenTreeCoverPerc}`)
  if (
    Number.isNaN(gteAgreementLevel) ||
    gteAgreementLevel < 1 ||
    gteAgreementLevel > precalForestAgreementSources.length
  )
    throw Error(`Not valid forest agreement level 1-${precalForestAgreementSources.length}: ${gteAgreementLevel}`)

  await authenticateToGee()

  const ftcCountry = AssetsController.getCountryBoundaries(countryIso)
  const asset = AssetsController.getForestAgreementAssetData(gteHansenTreeCoverPerc, gteAgreementLevel)
  const palette = agreementPalette.slice(0, precalForestAgreementSources.length)

  return new Promise((resolve, reject) => {
    asset.img
      .clip(ftcCountry)
      .selfMask()
      .getMap({ palette, min: 1, max: palette.length }, (mapProperties: any, err: any) => {
        if (err) {
          reject(err)
          return
        }
        resolve({
          mapId: mapProperties.mapid,
          palette,
        })
      })
  })
}

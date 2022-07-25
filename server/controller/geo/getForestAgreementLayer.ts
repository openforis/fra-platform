import { CountryIso } from '@meta/area'
import { agrPalette, Layer, precalForestAgrSources } from '@meta/geo'

import { AssetsController } from '@server/controller/geo/assets/'

import { authenticateToGee } from './authenticateToGee'

type Props = {
  countryIso: CountryIso
  gteHansenTreeCoverPerc: number
  gteAgr: number
}

export const getForestAgreementLayer = async (props: Props): Promise<Layer> => {
  const { countryIso, gteHansenTreeCoverPerc, gteAgr } = props

  await authenticateToGee()

  const ftcCountry = AssetsController.getCountryBoundaries(countryIso)
  const asset = AssetsController.getForestAgrAssetData(gteHansenTreeCoverPerc, gteAgr)
  const palette = agrPalette.slice(0, precalForestAgrSources.length)

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

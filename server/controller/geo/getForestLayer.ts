import { CountryIso } from '@meta/area'
import { ForestSource } from '@meta/geo'

import { AssetsController } from '@server/controller/geo/assets'

import { authenticateToGee } from './authenticateToGee'

type Props = {
  countryIso: CountryIso
  forestSource: ForestSource
}

type Layer = {
  mapId: string
  year: number
  scale: number
  palette: Array<string>
  citation?: string
}

export const getForestLayer = async (props: Props): Promise<Layer> => {
  const { countryIso, forestSource } = props

  await authenticateToGee()

  const ftcCountry = AssetsController.getCountryBoundaries(countryIso)
  const asset = AssetsController.getForestAssetData(forestSource)

  return new Promise((resolve, reject) => {
    asset.img
      .clip(ftcCountry)
      .selfMask()
      .getMap({ palette: asset.palette }, (mapProperties: any, err: any) => {
        if (err) {
          reject(err)
          return
        }
        resolve({
          mapId: mapProperties.mapid,
          year: asset.year,
          scale: asset.scale,
          palette: asset.palette,
          citation: asset.citation,
        })
      })
  })
}

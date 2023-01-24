// @ts-ignore
import { Image, Reducer } from '@google/earthengine'

import { CountryIso } from '@meta/area'
import { ForestEstimations, ForestSource } from '@meta/geo'

import { BaseProtocol, DB } from '@server/db'
import { ForestEstimationsRepository } from '@server/repository/geo/forestEstimations'

import { AssetsController } from './assets'

type Props = { countryIso: CountryIso; year: number }

export const getForestEstimations = async (props: Props, client: BaseProtocol = DB): Promise<ForestEstimations> => {
  return ForestEstimationsRepository.getOne(props, client)
}

export const estimateForestAgreementArea = async (props: {
  countryIso: CountryIso
  layer: Array<ForestSource>
  gteAgreementLevel: number
  gteHansenTreeCoverPerc?: number
  scale?: number
}): Promise<{ areaHa: number }> => {
  const { countryIso, layer, gteHansenTreeCoverPerc, gteAgreementLevel, scale = 30 } = props

  const ftcCountry = AssetsController.getCountryBoundaries(countryIso)
  const asset = AssetsController.getForestAgreementAssetData(layer, gteHansenTreeCoverPerc, gteAgreementLevel)

  const imgArea = asset.img.gte(1).rename('areaHa').multiply(Image.pixelArea()).divide(10000)

  const forestAgreementArea = imgArea.reduceRegion({
    reducer: Reducer.sum(),
    scale,
    geometry: ftcCountry.first().geometry(),
    maxPixels: 1e13,
  })

  return new Promise((resolve, reject) => {
    forestAgreementArea.evaluate((stats: { areaHa: number }, error: Error) => {
      if (error) {
        reject(error)
        return
      }
      resolve(stats)
    })
  })
}

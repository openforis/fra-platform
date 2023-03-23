// @ts-ignore
import { Image, Reducer } from '@google/earthengine'

import { CountryIso } from '@meta/area'
import { ForestEstimations, LayerSource } from '@meta/geo'

import { BaseProtocol, DB } from '@server/db'
import { ForestEstimationsRepository } from '@server/repository/geo/forestEstimations'

import { AssetsController } from './assets'

type Props = { countryIso: CountryIso; year: number }

export const getForestEstimations = async (props: Props, client: BaseProtocol = DB): Promise<ForestEstimations> => {
  return ForestEstimationsRepository.getOne(props, client)
}

export const estimateArea = async (props: {
  countryIso: CountryIso
  maskImage: Image
  baseImage?: Image
  scale?: number
}): Promise<{ areaHa: number }> => {
  const { countryIso, maskImage, baseImage = null, scale = 30 } = props
  const ftcCountry = AssetsController.getCountryBoundaries(countryIso)

  const imgArea = baseImage !== null ? baseImage.mask(maskImage.eq(1)) : maskImage.eq(1)

  const imgAreaStats = imgArea.rename('areaHa').multiply(Image.pixelArea()).divide(10000).reduceRegion({
    reducer: Reducer.sum(),
    scale,
    geometry: ftcCountry.geometry(),
    maxPixels: 1e13,
  })

  return new Promise((resolve, reject) => {
    imgAreaStats.evaluate((stats: { areaHa: number }, error: Error) => {
      if (error) {
        reject(error)
        return
      }
      resolve(stats)
    })
  })
}

export const estimateForestAgreementArea = async (props: {
  countryIso: CountryIso
  layers: Array<LayerSource>
  gteAgreementLevel: number
  scale?: number
}): Promise<{ areaHa: number }> => {
  const { countryIso, layers, gteAgreementLevel, scale = 30 } = props
  const asset = AssetsController.getForestAgreementAssetData(layers, gteAgreementLevel)

  return estimateArea({ countryIso, maskImage: asset.img.gte(1), scale })
}

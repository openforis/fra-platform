// @ts-ignore
import { Image, Reducer } from '@google/earthengine'

import { CountryIso } from 'meta/area'
import { ForestEstimations, LayerSource } from 'meta/geo'

import { BaseProtocol, DB } from 'server/db'
import { ForestEstimationsRepository } from 'server/repository/geo/forestEstimations'

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

  const imgArea = baseImage !== null ? baseImage.mask(maskImage) : maskImage

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

export const estimateImageArea = async (props: {
  countryIso: CountryIso
  layer: LayerSource
  scale?: number
}): Promise<{ areaHa: number }> => {
  const { countryIso, layer, scale = 30 } = props

  const asset = AssetsController.getAssetData(layer)

  return estimateArea({ countryIso, maskImage: asset.img.gte(1), scale })
}

export const estimateIntersectionArea = async (props: {
  countryIso: CountryIso
  baseSource: LayerSource
  maskSource: LayerSource
  scale?: number
}): Promise<{ areaHa: number }> => {
  const { baseSource, maskSource, countryIso, scale = 30 } = props

  const baseAsset = AssetsController.getAssetData(baseSource)
  const maskAsset = AssetsController.getAssetData(maskSource)

  return estimateArea({ countryIso, baseImage: baseAsset.img.gte(1), maskImage: maskAsset.img.gte(1), scale })
}

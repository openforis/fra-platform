// @ts-ignore
import { Image, Reducer } from '@google/earthengine'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentNames } from 'meta/assessment/assessment'
import { ForestEstimations } from 'meta/geo/forest/estimations'
import { LayerSource } from 'meta/geo/layer/source'

import { AssessmentController } from 'server/controller/assessment'
import { _getLastPublishedFra1aForestArea } from 'server/controller/geo/_getLastPublishedFra1aForestArea'
import { BaseProtocol, DB } from 'server/db/db'
import { ForestEstimationsRepository } from 'server/db/repository/geo/forestEstimations'

import { AssetsController } from './assets'

type Props = { countryIso: CountryIso; year: string }

export const getForestEstimations = async (props: Props, client: BaseProtocol = DB): Promise<ForestEstimations> => {
  const { countryIso, year } = props

  const forestEstimations = await ForestEstimationsRepository.getOne({ countryIso, year }, client)

  if (!forestEstimations) return forestEstimations

  const assessment = await AssessmentController.getOne({ assessmentName: AssessmentNames.fra }, client)
  const lastPublishedFra1aForestArea = await _getLastPublishedFra1aForestArea({ assessment, countryIso }, client)
  if (lastPublishedFra1aForestArea !== null) forestEstimations.data.fra1aForestArea = lastPublishedFra1aForestArea

  return forestEstimations
}

export const estimateArea = async (props: {
  countryIso: CountryIso
  maskImage: Image
  baseImage?: Image
  scale?: number
}): Promise<{ areaHa: number }> => {
  const { baseImage = null, countryIso, maskImage, scale = 30 } = props
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
  const { baseSource, countryIso, maskSource, scale = 30 } = props

  const baseAsset = AssetsController.getAssetData(baseSource)
  const maskAsset = AssetsController.getAssetData(maskSource)

  return estimateArea({ countryIso, baseImage: baseAsset.img.gte(1), maskImage: maskAsset.img.gte(1), scale })
}

// @ts-ignore
import { Image, ImageCollection } from '@google/earthengine'

import { ForestSource, LayerSource, sourcesMetadata } from 'meta/geo'

export const getForestAssetData = (layer: LayerSource): { year?: number; img: Image; metadata: any } => {
  let asset = {} as { year?: number; img: Image; metadata: any }

  switch (layer.key) {
    case ForestSource.JAXA: {
      const imgForestJAXA = ImageCollection('JAXA/ALOS/PALSAR/YEARLY/FNF').filterDate('2017-01-01', '2017-12-31').mosaic().eq(1)

      asset = {
        year: 2017,
        img: imgForestJAXA,
        metadata: sourcesMetadata[layer.key],
      }
      break
    }
    case ForestSource.TandemX: {
      const imgForestTANDEMX = ImageCollection('users/debcysjec/fao_fra/tandem_x_fnf50').mosaic().eq(1)

      asset = {
        year: 2019,
        img: imgForestTANDEMX,
        metadata: sourcesMetadata[layer.key],
      }
      break
    }
    case ForestSource.ESAGlobCover: {
      const imgLandCoverESA = Image('ESA/GLOBCOVER_L4_200901_200912_V2_3').select('landcover')
      const imgForestLCESA = imgLandCoverESA
        .gte(39)
        .and(imgLandCoverESA.lte(101))
        .add(imgLandCoverESA.gte(160).and(imgLandCoverESA.lte(170)))

      asset = {
        year: 2009,
        img: imgForestLCESA,
        metadata: sourcesMetadata[layer.key],
      }
      break
    }
    case ForestSource.GlobeLand: {
      const imgForestGlobeLand = ImageCollection('users/eraviolo/GlobeLand30m_2020').mosaic().eq(20)

      asset = {
        year: 2020,
        img: imgForestGlobeLand,
        metadata: sourcesMetadata[layer.key],
      }
      break
    }

    case ForestSource.Copernicus: {
      const imgForestCopernicus = Image('users/eraviolo/WORLD/Copernicus_forest_2019_100m').eq(1)

      asset = {
        year: 2019,
        img: imgForestCopernicus,
        metadata: sourcesMetadata[layer.key],
      }
      break
    }
    case ForestSource.ESRI: {
      const imgForestESRIy2020 = Image('users/cesarnon/World/esri_lulc10_UNCCDcat_World').eq(1)

      asset = {
        year: 2020,
        img: imgForestESRIy2020,
        metadata: sourcesMetadata[layer.key],
      }
      break
    }
    case ForestSource.ESAWorldCover: {
      const imgESAy2020 = ImageCollection('ESA/WorldCover/v100').first()
      const imgForestESAy2020 = imgESAy2020.eq(10).or(imgESAy2020.eq(95))

      asset = {
        year: 2020,
        img: imgForestESAy2020,
        metadata: sourcesMetadata[layer.key],
      }
      break
    }

    case ForestSource.Hansen: {
      const imcHansen = Image('UMD/hansen/global_forest_change_2021_v1_9')
      const hforest2000 = imcHansen.select('treecover2000')
      const lossyear = imcHansen.select('lossyear')
      const hlost = lossyear.gte(1).and(lossyear.lte(20))
      const hgain = imcHansen.select('gain')
      const imgForestHansen = hforest2000.gte(layer.options.gteTreeCoverPercent).where(hgain.eq(1), 1).where(hlost.eq(1), 0)

      asset = {
        year: 2020,
        img: imgForestHansen,
        metadata: sourcesMetadata[layer.key],
      }
      break
    }
    case ForestSource.CustomFnF: {
      const imgCustom = Image(layer.options.assetId).select(0).eq(1)

      asset = {
        img: imgCustom,
        metadata: sourcesMetadata[layer.key],
      }
      break
    }

    case ForestSource.Agreement: {
      let imgAddition = Image(0)

      layer.options.agreement.layers.forEach(function (source) {
        const asset = getForestAssetData(source)
        imgAddition = imgAddition.add(asset.img.unmask())
      })

      asset = {
        img: imgAddition.mask(imgAddition.gte(layer.options.agreement.gteAgreementLevel)),
        metadata: sourcesMetadata[layer.key],
      }
      break
    }

    default:
      return null
  }

  return asset
}

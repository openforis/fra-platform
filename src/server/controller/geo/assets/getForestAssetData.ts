// @ts-ignore
import { Image, ImageCollection } from '@google/earthengine'

import { ForestKey } from 'meta/geo/forest/key'
import { forestLayersMetadata } from 'meta/geo/forest/layersMetadata'
import { LayerSource } from 'meta/geo/layer/source'

export const getForestAssetData = (layer: LayerSource): { year?: number; img: Image; metadata: any } => {
  switch (layer.key) {
    case ForestKey.JAXA: {
      const imgForestJAXA = ImageCollection('JAXA/ALOS/PALSAR/YEARLY/FNF')
        .filterDate('2017-01-01', '2017-12-31')
        .mosaic()
        .eq(1)
        .selfMask()

      return {
        year: 2017,
        img: imgForestJAXA,
        metadata: forestLayersMetadata[layer.key],
      }
    }
    case ForestKey.TandemX: {
      const imgForestTANDEMX = ImageCollection('users/debcysjec/fao_fra/tandem_x_fnf50').mosaic().eq(1).selfMask()

      return {
        year: 2019,
        img: imgForestTANDEMX,
        metadata: forestLayersMetadata[layer.key],
      }
    }
    case ForestKey.ESAGlobCover: {
      const imgLandCoverESA = Image('ESA/GLOBCOVER_L4_200901_200912_V2_3').select('landcover')
      const imgForestLCESA = imgLandCoverESA
        .gte(39)
        .and(imgLandCoverESA.lte(101))
        .add(imgLandCoverESA.gte(160).and(imgLandCoverESA.lte(170)))
        .selfMask()

      return {
        year: 2009,
        img: imgForestLCESA,
        metadata: forestLayersMetadata[layer.key],
      }
    }
    case ForestKey.GlobeLand: {
      const imgForestGlobeLand = ImageCollection('users/eraviolo/GlobeLand30m_2020').mosaic().eq(20).selfMask()

      return {
        year: 2020,
        img: imgForestGlobeLand,
        metadata: forestLayersMetadata[layer.key],
      }
    }

    case ForestKey.Copernicus: {
      const imgForestCopernicus = Image('users/eraviolo/WORLD/Copernicus_forest_2019_100m').eq(1).selfMask()
      return {
        year: 2019,
        img: imgForestCopernicus,
        metadata: forestLayersMetadata[layer.key],
      }
    }
    case ForestKey.ESRI: {
      const imgForestESRIy2020 = Image('users/cesarnon/World/esri_lulc10_UNCCDcat_World').eq(1).selfMask()

      return {
        year: 2020,
        img: imgForestESRIy2020,
        metadata: forestLayersMetadata[layer.key],
      }
    }
    case ForestKey.ESAWorldCover: {
      const imgESAy2020 = ImageCollection('ESA/WorldCover/v100').first()
      const imgForestESAy2020 = imgESAy2020.eq(10).or(imgESAy2020.eq(95)).selfMask()

      return {
        year: 2020,
        img: imgForestESAy2020,
        metadata: forestLayersMetadata[layer.key],
      }
    }

    case ForestKey.Hansen: {
      const imcHansen = Image('UMD/hansen/global_forest_change_2021_v1_9')
      const hforest2000 = imcHansen.select('treecover2000')
      const lossyear = imcHansen.select('lossyear')
      const hlost = lossyear.gte(1).and(lossyear.lte(20))
      const hgain = imcHansen.select('gain')
      const imgForestHansen = hforest2000
        .gte(layer.options.gteTreeCoverPercent)
        .where(hgain.eq(1), 1)
        .where(hlost.eq(1), 0)
        .selfMask()

      return {
        year: 2020,
        img: imgForestHansen,
        metadata: forestLayersMetadata[layer.key],
      }
    }

    case ForestKey.JRC2020: {
      const imgForestJRC2020 = ImageCollection('JRC/GFC2020/V2').mosaic()

      return {
        year: 2020,
        img: imgForestJRC2020,
        metadata: forestLayersMetadata[layer.key],
      }
    }

    case ForestKey.CustomFnF: {
      const imgCustom = Image(layer.options.assetId).select(0).eq(1).selfMask()

      return {
        img: imgCustom,
        metadata: forestLayersMetadata[layer.key],
      }
    }

    case ForestKey.Agreement: {
      let imgAddition = Image(0)

      layer.options.agreement.layers.forEach(function (source) {
        const sourceAsset = getForestAssetData(source)
        imgAddition = imgAddition.add(sourceAsset.img.unmask())
      })

      return {
        img: imgAddition.mask(imgAddition.gte(layer.options.agreement.gteAgreementLevel)),
        metadata: forestLayersMetadata[layer.key],
      }
    }

    default:
      return null
  }
}

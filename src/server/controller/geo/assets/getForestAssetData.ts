// @ts-ignore
import { Image, ImageCollection } from '@google/earthengine'

import { ForestSource } from '@meta/geo'

export const getForestAssetData = (
  forestSource: ForestSource,
  gteHansenTreeCoverPerc?: number,
  onlyProtected?: boolean
): { year: number; img: Image } => {
  let asset = {} as any

  switch (forestSource) {
    case ForestSource.JAXA: {
      const imgForestJAXA = ImageCollection('JAXA/ALOS/PALSAR/YEARLY/FNF')
        .filterDate('2017-01-01', '2017-12-31')
        .mosaic()
        .eq(1)

      asset = {
        year: 2017,
        img: imgForestJAXA,
      }
      break
    }
    case ForestSource.TandemX: {
      const imgForestTANDEMX = ImageCollection('users/debcysjec/fao_fra/tandem_x_fnf50').mosaic().eq(1)

      asset = {
        year: 2019,
        img: imgForestTANDEMX,
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
      }
      break
    }
    case ForestSource.GlobeLand: {
      const imgForestGlobeLand = ImageCollection('users/eraviolo/GlobeLand30m_2020').mosaic().eq(20)

      asset = {
        year: 2020,
        img: imgForestGlobeLand,
      }
      break
    }

    case ForestSource.Copernicus: {
      const imgForestCopernicus = Image('users/eraviolo/WORLD/Copernicus_forest_2019_100m').eq(1)

      asset = {
        year: 2019,
        img: imgForestCopernicus,
      }
      break
    }
    case ForestSource.ESRI: {
      const imgForestESRIy2020 = Image('users/cesarnon/World/esri_lulc10_UNCCDcat_World').eq(1)

      asset = {
        year: 2020,
        img: imgForestESRIy2020,
      }
      break
    }
    case ForestSource.ESAWorldCover: {
      const imgESAy2020 = ImageCollection('ESA/WorldCover/v100').first()
      const imgForestESAy2020 = imgESAy2020.eq(10).or(imgESAy2020.eq(95))

      asset = {
        year: 2020,
        img: imgForestESAy2020,
      }
      break
    }

    case ForestSource.Hansen: {
      if (Number.isNaN(gteHansenTreeCoverPerc) || gteHansenTreeCoverPerc < 0 || gteHansenTreeCoverPerc > 100)
        throw Error(`Not valid Hansen tree cover percentage 0-100: ${gteHansenTreeCoverPerc}`)

      const imcHansen = Image('UMD/hansen/global_forest_change_2021_v1_9')
      const hforest2000 = imcHansen.select('treecover2000')
      const lossyear = imcHansen.select('lossyear')
      const hlost = lossyear.gte(1).and(lossyear.lte(20))
      const hgain = imcHansen.select('gain')
      const imgForestHansen = hforest2000.gte(gteHansenTreeCoverPerc).where(hgain.eq(1), 1).where(hlost.eq(1), 0)

      asset = {
        year: 2020,
        img: imgForestHansen,
      }
      break
    }

    default:
      return null
  }

  if (onlyProtected) {
    const imgNationalProtectedArea = Image('users/projectgeffao/World/PAs_WDPA_image_Bin_30m_World')
    asset.img = asset.img.mask(imgNationalProtectedArea.eq(1))
  }
  return asset
}

export const getForestAgreementAssetData = (
  sourceLayers: Array<ForestSource>,
  gteHansenTreeCoverPerc = 10,
  gteAgreementLevel = 1
): { img: Image } => {
  let imgAddition = Image(0)

  sourceLayers.forEach(function (source) {
    const asset = getForestAssetData(source, gteHansenTreeCoverPerc)
    imgAddition = imgAddition.add(asset.img.unmask())
  })

  return {
    img: imgAddition.mask(imgAddition.gte(gteAgreementLevel)),
  }
}

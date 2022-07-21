// @ts-ignore
import { Image, ImageCollection } from '@google/earthengine'

import { ForestSource, precalForestAgrSources } from '@meta/geo'

export const getForestAssetData = (
  forestSource: ForestSource,
  gteHansenTreeCoverPerc: 10 | 20 | 30 = 10
): { year: number; img: Image } => {
  switch (forestSource) {
    case ForestSource.JAXA: {
      const imgForestJAXA = ImageCollection('JAXA/ALOS/PALSAR/YEARLY/FNF')
        .filterDate('2017-01-01', '2017-12-31')
        .mosaic()
        .eq(1)

      return {
        year: 2017,
        img: imgForestJAXA,
      }
    }
    case ForestSource.TandemX: {
      const imgForestTANDEMX = ImageCollection('users/debcysjec/fao_fra/tandem_x_fnf50').mosaic().eq(1)

      return {
        year: 2019,
        img: imgForestTANDEMX,
      }
    }
    case ForestSource.ESAGlobCover: {
      const imgLandCoverESA = Image('ESA/GLOBCOVER_L4_200901_200912_V2_3').select('landcover')
      const imgForestLCESA = imgLandCoverESA
        .gte(39)
        .and(imgLandCoverESA.lte(101))
        .add(imgLandCoverESA.gte(160).and(imgLandCoverESA.lte(170)))

      return {
        year: 2009,
        img: imgForestLCESA,
      }
    }
    case ForestSource.GlobeLand: {
      const imgForestGlobeLand = ImageCollection('users/eraviolo/GlobeLand30m_2020').mosaic().eq(20)

      return {
        year: 2020,
        img: imgForestGlobeLand,
      }
    }

    case ForestSource.Copernicus: {
      const imgForestCopernicus = Image('users/eraviolo/WORLD/Copernicus_forest_2019_100m').eq(1)

      return {
        year: 2019,
        img: imgForestCopernicus,
      }
    }
    case ForestSource.ESRI: {
      const imgForestESRIy2020 = Image('users/cesarnon/World/esri_lulc10_UNCCDcat_World').eq(1)

      return {
        year: 2020,
        img: imgForestESRIy2020,
      }
    }
    case ForestSource.ESAWorldCover: {
      const imgESAy2020 = ImageCollection('ESA/WorldCover/v100').first()
      const imgForestESAy2020 = imgESAy2020.eq(10).or(imgESAy2020.eq(95))

      return {
        year: 2020,
        img: imgForestESAy2020,
      }
    }

    case ForestSource.Hansen: {
      const imcHansen = Image('UMD/hansen/global_forest_change_2021_v1_9')
      const hforest2000 = imcHansen.select('treecover2000')
      const lossyear = imcHansen.select('lossyear')
      const hlost = lossyear.gte(1).and(lossyear.lte(20))
      const hgain = imcHansen.select('gain')
      const imgForestHansen = hforest2000.gte(gteHansenTreeCoverPerc).where(hgain.eq(1), 1).where(hlost.eq(1), 0)

      return {
        year: 2020,
        img: imgForestHansen,
      }
    }

    default:
      return null
  }
}

export const getForestAgrAssetData = (gteHansenTreeCoverPerc: 10 | 20 | 30, gteAgr = 1): { img: Image } => {
  let imgAddition = Image(0)
  precalForestAgrSources.forEach(function (source) {
    const asset = getForestAssetData(source, gteHansenTreeCoverPerc)
    imgAddition = imgAddition.add(asset.img.unmask())
  })

  return {
    img: imgAddition.mask(imgAddition.gte(gteAgr)),
  }
}

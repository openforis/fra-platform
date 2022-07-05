// @ts-ignore
import { Image, ImageCollection } from '@google/earthengine'

import { ForestSource } from '@meta/geo'

export type AssetData = {
  year: number
  scale: number
  img: any
  palette: Array<string>
  citation?: string
}

export const getForestAssetData = (forestSource: ForestSource): AssetData => {
  const imcHansen = Image('UMD/hansen/global_forest_change_2021_v1_9')
  const hforest2000 = imcHansen.select('treecover2000')
  const lossyear = imcHansen.select('lossyear')
  const hlost = lossyear.gte(1).and(lossyear.lte(20))
  const hgain = imcHansen.select('gain')

  switch (forestSource) {
    case ForestSource.JAXA: {
      const imgForestJAXA = ImageCollection('JAXA/ALOS/PALSAR/YEARLY/FNF')
        .filterDate('2017-01-01', '2017-12-31')
        .mosaic()
        .eq(1)

      return {
        year: 2017,
        scale: 24.7376,
        img: imgForestJAXA,
        palette: ['purple'],
      }
    }
    case ForestSource.TandemX: {
      const imgForestTANDEMX = ImageCollection('users/debcysjec/fao_fra/tandem_x_fnf50').mosaic().eq(1)

      return {
        year: 2019,
        scale: 55.6597,
        img: imgForestTANDEMX,
        palette: ['green'],
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
        scale: 309.2208,
        img: imgForestLCESA,
        palette: ['yellow'],
        citation: 'https://www.esa.int/ESA_Multimedia/Images/2010/12/ESA_s_2009_global_land_cover_map',
      }
    }
    case ForestSource.GlobeLand: {
      const imgForestGlobeLand = ImageCollection('users/jhoelicq/globallandcover30/2010') // ToDo use 2020 version?
        .mosaic()
        .eq(20)

      return {
        year: 2010,
        scale: 30,
        img: imgForestGlobeLand,
        palette: ['red'],
        citation: 'https://www.un-spider.org/links-and-resources/data-sources/land-cover-map-globeland-30-ngcc',
      }
    }
    case ForestSource.ESAAfriCover: {
      const imgForestAfriCoverESA = Image('users/kindgard/ESACCI-LC-L4-LC10-Map-20m-P1Y-2016-v10').eq(1)

      return {
        year: 2016,
        scale: 20.6147,
        img: imgForestAfriCoverESA,
        palette: ['olive'],
        citation: 'https://2016africalandcover20m.esrin.esa.int/',
      }
    }

    case ForestSource.Copernicus: {
      const imgForestCopernicus = Image('users/eraviolo/WORLD/Copernicus_forest_2019_100m').eq(1)

      return {
        year: 2019,
        scale: 100,
        img: imgForestCopernicus,
        palette: ['yellow'],
        citation: 'https://2016africalandcover20m.esrin.esa.int/',
      }
    }
    case ForestSource.ESRI: {
      const imgForestESRIy2020 = Image('users/cesarnon/World/esri_lulc10_UNCCDcat_World').eq(1)

      return {
        year: 2020,
        scale: 10,
        img: imgForestESRIy2020,
        palette: ['coral'],
      }
    }
    case ForestSource.ESAWorldCover: {
      const imgESAy2020 = ImageCollection('ESA/WorldCover/v100').first()
      const imgForestESAy2020 = imgESAy2020.eq(10).or(imgESAy2020.eq(95))

      return {
        year: 2020,
        scale: 10,
        img: imgForestESAy2020,
        palette: ['#00ffff'],
      }
    }

    case ForestSource.Hansen10: {
      const imgForestHansen10 = hforest2000.gte(10).where(hgain.eq(1), 1).where(hlost.eq(1), 0)

      return {
        year: 2020,
        scale: 30.92,
        img: imgForestHansen10,
        palette: ['#00ff00'],
      }
    }
    case ForestSource.Hansen20: {
      const imgForestHansen20 = hforest2000.gte(20).where(hgain.eq(1), 1).where(hlost.eq(1), 0)

      return {
        year: 2020,
        scale: 30.92,
        img: imgForestHansen20,
        palette: ['brown'],
      }
    }

    case ForestSource.Hansen30: {
      const imgForestHansen30 = hforest2000.gte(30).where(hgain.eq(1), 1).where(hlost.eq(1), 0)

      return {
        year: 2020,
        scale: 30.92,
        img: imgForestHansen30,
        palette: ['silver'],
      }
    }

    default:
      return null
  }
}

import { CountryIso } from 'meta/area/countryIso'
import { MosaicOptions } from 'meta/geo/mosaic/options'

export const _getUrlTemplateReqBody = (mosaicOptions: MosaicOptions, countryIso: CountryIso): any => {
  const { maxCloudCoverage, snowMasking, sources, year } = mosaicOptions
  let dataSets = {}

  if (sources.sentinel) {
    dataSets = { SENTINEL: ['SENTINEL_2'] }
  } else if (sources.landsat) {
    dataSets = { LANDSAT: ['LANDSAT_7', 'LANDSAT_8'] }
  }

  const body = {
    recipe: {
      id: '390c7c3f-1540-0e1f-52a0-5609b46122a8',
      type: 'MOSAIC',
      placeholder: 'Optical_mosaic_2022-04-03_21-57-59',
      model: {
        dates: {
          targetDate: `${year}-07-02`,
          seasonStart: `${year}-01-01`,
          seasonEnd: `${year + 1}-01-01`,
          yearsBefore: 0,
          yearsAfter: 0,
        },
        sources: {
          dataSets,
          cloudPercentageThreshold: maxCloudCoverage,
        },
        sceneSelectionOptions: { type: 'ALL', targetDateWeight: 0 },
        compositeOptions: {
          corrections: ['SR'],
          // @ts-ignore
          filters: [],
          cloudDetection: ['QA'],
          cloudMasking: 'MODERATE',
          cloudBuffering: 0,
          snowMasking: snowMasking ? 'ON' : 'OFF',
          compose: 'MEDIAN',
        },
        scenes: {},
        aoi: {
          type: 'EE_TABLE',
          id: 'users/geofra/boundaries/UN_Res0_ADM0_BNDA_CTY_FRA_v1',
          keyColumn: 'ISO3CD',
          key: countryIso,
          buffer: 0,
        },
      },
    },
    visParams: {
      type: 'rgb',
      bands: ['red', 'green', 'blue'],
      min: [300, 100, 0],
      max: [2500, 2500, 2300],
      gamma: [1.3, 1.3, 1.3],
      inverted: [false, false, false],
    },
  }

  return body
}

import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { MosaicOptions } from '@meta/geo'

const getReqBody = (mosaicOptions: MosaicOptions) => {
  const body = {
    recipe: {
      id: '390c7c3f-1540-0e1f-52a0-5609b46122a8',
      type: 'MOSAIC',
      placeholder: 'Optical_mosaic_2022-04-03_21-57-59',
      model: {
        dates: {
          targetDate: '2022-07-02',
          seasonStart: '2022-01-01',
          seasonEnd: '2023-01-01',
          yearsBefore: 0,
          yearsAfter: 0,
        },
        sources: {},
        sceneSelectionOptions: { type: 'ALL', targetDateWeight: 0 },
        compositeOptions: {
          corrections: ['SR', 'BRDF'],
          // @ts-ignore
          filters: [],
          cloudDetection: ['QA', 'CLOUD_SCORE'],
          cloudMasking: 'MODERATE',
          cloudBuffering: 0,
          snowMasking: 'ON',
          compose: 'MEDOID',
        },
        scenes: {},
        aoi: {
          type: 'EE_TABLE',
          id: 'users/wiell/SepalResources/gaul',
          keyColumn: 'id',
          key: 84,
          level: 'COUNTRY',
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

  const sources: any = {}

  if (mosaicOptions.sources.includes('sentinel')) {
    sources.SENTINEL = ['SENTINEL_2']
  }
  if (mosaicOptions.sources.includes('sentinel')) {
    sources.LANDSAT = ['LANDSAT_9', 'LANDSAT_8']
  }

  body.recipe.model.sources = sources
  return body
}

export const postMosaicOptions = createAsyncThunk<{ urlTemplate: string }, MosaicOptions>(
  'geo/post/mosaic',
  async (mosaicOptions: MosaicOptions) => {
    const body = getReqBody(mosaicOptions)
    const { data } = await axios.post(`${ApiEndPoint.Geo.sepalProxy()}/preview`, body)

    return data
  }
)

import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { ODPs } from 'meta/assessment/odps'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

export const getOriginalDataPoint = createAsyncThunk<OriginalDataPoint, CycleParams & { year: string }>(
  'data/originalDataPoint/get/byYear',
  async ({ assessmentName, countryIso, cycleName, year }) => {
    const { data } = await axios.get(ApiEndPoint.CycleData.OriginalDataPoint.one(), {
      params: {
        countryIso,
        assessmentName,
        cycleName,
        year,
      },
    })
    return ODPs.addNationalClassPlaceHolder(data)
  }
)

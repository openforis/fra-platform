import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { ODPs, OriginalDataPoint } from 'meta/assessment'

export const getOriginalDataPoint = createAsyncThunk<OriginalDataPoint, CycleParams & { year: string }>(
  'originalDataPoint/get/byYear',
  async ({ countryIso, assessmentName, cycleName, year }) => {
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

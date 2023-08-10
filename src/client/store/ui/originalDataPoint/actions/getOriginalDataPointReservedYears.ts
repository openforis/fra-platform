import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { ODPReservedYear } from 'meta/assessment'

export const getOriginalDataPointReservedYears = createAsyncThunk<Array<ODPReservedYear>, CycleParams>(
  'originalDataPoint/get/reservedYears',
  async ({ countryIso, assessmentName, cycleName }) => {
    const { data } = await axios.get(ApiEndPoint.CycleData.OriginalDataPoint.reservedYears(), {
      params: {
        countryIso,
        assessmentName,
        cycleName,
      },
    })
    return data.sort((a: ODPReservedYear, b: ODPReservedYear) => a.year - b.year)
  }
)

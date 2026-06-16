import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryParams } from 'meta/api/request/country'
import { ODPReservedYear } from 'meta/assessment/originalDataPoint'

export const getOriginalDataPointReservedYears = createAsyncThunk<Array<ODPReservedYear>, CountryParams>(
  'data/originalDataPoint/reservedYears/get',
  async ({ assessmentName, countryIso, cycleName }) => {
    const { data } = await axios.get(ApiEndPoint.CycleData.NationalDataPoint.reservedYears(), {
      params: {
        countryIso,
        assessmentName,
        cycleName,
      },
    })
    return data.sort((a: ODPReservedYear, b: ODPReservedYear) => a.year - b.year)
  }
)

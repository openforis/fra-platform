import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CycleParams } from '@meta/api/request'

export const getOriginalDataPointReservedYears = createAsyncThunk<Array<number>, CycleParams>(
  'originalDataPoint/get/reservedYears',
  async ({ countryIso, assessmentName, cycleName }) => {
    const {
      data: { years },
    }: { data: { years: number[] } } = await axios.get(ApiEndPoint.CycleData.OriginalDataPoint.reservedYears(), {
      params: {
        countryIso,
        assessmentName,
        cycleName,
      },
    })
    return years
  }
)

import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { SectionName } from 'meta/assessment/section'

type Props = CycleParams & { sectionName: SectionName; year: string }

type Returned = OriginalDataPoint

export const getOriginalDataPointHistory = createAsyncThunk<Returned, Props>(
  'data/originalDataPoint/history/get',
  async ({ assessmentName, countryIso, cycleName, sectionName, year }) => {
    const { data } = await axios.get(ApiEndPoint.CycleData.OriginalDataPoint.history(), {
      params: {
        assessmentName,
        countryIso,
        cycleName,
        sectionName,
        year,
      },
    })

    return data
  }
)
